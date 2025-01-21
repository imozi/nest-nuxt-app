<script setup lang="ts">
import { object, string, array } from 'zod';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import type { IFetchError } from 'ofetch';
import MaterialFormChoicedFile from './MaterialFormChoicedFile.vue';

const mode = defineModel<'material' | 'material-page'>('mode', { required: true });

const formSchemaMaterial = toTypedSchema(
  object({
    id: string(),
    name: string({
      required_error: 'Поле не должно быть пустым',
    }).trim(),
    slug: string().trim().optional(),
    description: string().trim().optional(),
    text: string().trim().optional(),
    resources: array(
      object({
        url: string(),
        name: string(),
        type: string(),
        originalName: string().refine((value) => value.slice(0, value.lastIndexOf('.'))),
        extention: string(),
        size: string(),
        text: string().optional(),
        description: string().optional(),
      }),
    )
      .min(1, { message: 'Прикрепите файл' })
      .default([]),
    tags: array(string(), { message: 'Выберите хотя бы один тег' }).min(1, { message: 'Выберите хотя бы один тег' }),
    date: string({ required_error: 'Выберите дату' }),
    isPublished: string({
      required_error: 'Выберите статус',
    }).transform((value) => (value === 'true' ? true : false)),
    menuItem: string({ required_error: 'Поле не должно быть пустым' }).trim().optional(),
    page: string({ required_error: 'Поле не должно быть пустым' }).trim().optional(),
  }),
);

const { handleSubmit, setFieldValue, values, resetForm } = useForm({
  validationSchema: formSchemaMaterial,
});
const isSaved = ref<boolean>(false);

const onSubmit = handleSubmit(async (values) => {
  isSaved.value = true;

  if (values.menuItem === undefined && values.page === undefined) {
    return toast.error('Прикрпите материал к пункту меню или странице');
  }

  const promise = async () => {
    try {
      await $fetchSecure(`/materials`, { body: values, method: 'PATCH' });
      return 'Материал успешно изменен!';
    } catch (error) {
      const err = (error as IFetchError<ResponseError>).data;
      throw createError({ message: err?.message, statusCode: err?.statusCode });
    }
  };

  toast.promise(promise, {
    loading: 'Сохранение...',
    success: (message: string) => {
      isSaved.value = false;
      navigateTo('/dashboard/materials');
      return message;
    },
    error: (err: ResponseError) => {
      isSaved.value = false;
      return err.message;
    },
  });
});

defineExpose({
  onSubmit,
  resetForm,
});

const { data: tags } = await useFetchSecure<ResponseData<Tags>>(`/tags`);
const { data: menu } = await useFetchSecure<ResponseData<MenuItem>>('/menu/items');
const { data: pages } = await useFetchSecure<ResponseData<Page>>('/pages');
const { data: material } = useNuxtData<MaterialSingle>('material');

const setAliasOnBlurTitle = () => {
  if (mode.value === 'material') {
    return;
  }

  if (values.name && !values.slug) {
    setFieldValue('slug', createAlias(values.name));
  }
};

const onFileRemove = (name: string) => {
  const newResources = values.resources?.filter((file) => file.name !== name);

  setFieldValue('resources', newResources);
};

watch(values, () => {
  if (values.name === '') {
    setFieldValue('name', undefined);
  }

  if (values.slug === '') {
    setFieldValue('slug', undefined);
  }
});

watch(
  () => values.menuItem,
  () => {
    if (values.page && values.menuItem) {
      setFieldValue('page', undefined);
    }
  },
);

watch(
  () => values.page,
  () => {
    if (values.menuItem && values.page) {
      setFieldValue('menuItem', undefined);
    }
  },
);

onBeforeMount(() => {
  setFieldValue('id', material.value?.id);
  setFieldValue('name', material.value?.name);
  setFieldValue('slug', material.value?.slug ? material.value?.slug : undefined);
  setFieldValue('description', material.value?.description ? material.value?.description : undefined);
  setFieldValue('text', material.value?.text ? material.value?.text : undefined);
  setFieldValue('date', material.value?.date);

  if (material.value?.menuItemId) {
    setFieldValue('menuItem', material.value?.menuItemId);
  }

  if (material.value?.pageId) {
    setFieldValue('page', material.value?.pageId);
  }

  setFieldValue('resources', material.value?.resources);
  setFieldValue('isPublished', `${material.value?.isPublished}`);
  setFieldValue(
    'tags',
    material.value?.tags.map((tag) => tag.id),
  );
});
</script>

<template>
  <div class="grid grid-cols-3 gap-8">
    <div class="col-span-2 grid gap-8 break-all" :class="{ 'auto-rows-max': mode === 'material' }">
      <UiCard>
        <UiCardHeader class="mb-2">
          <UiCardTitle>Название материала</UiCardTitle>
        </UiCardHeader>
        <UiCardContent class="flex flex-col gap-y-5">
          <UiFormField v-slot="{ componentField }" name="name">
            <UiFormItem class="flex flex-col gap-y-2">
              <UiFormLabel>Название</UiFormLabel>

              <UiFormControl>
                <UiTextarea type="text" placeholder="Название" v-bind="componentField" @blur="setAliasOnBlurTitle" />
              </UiFormControl>

              <UiFormMessage />
            </UiFormItem>
          </UiFormField>

          <UiFormField v-if="mode === 'material-page'" v-slot="{ componentField }" name="slug">
            <UiFormItem class="flex flex-col gap-y-2">
              <UiFormLabel>Алиас (ЧПУ)</UiFormLabel>

              <UiFormControl>
                <UiInput type="text" placeholder="алиас" v-bind="componentField" />
              </UiFormControl>

              <UiFormMessage />
            </UiFormItem>
          </UiFormField>

          <UiFormField v-if="mode === 'material-page'" v-slot="{ componentField }" name="description">
            <UiFormItem class="flex flex-col gap-y-2">
              <UiFormLabel>Краткое описание</UiFormLabel>

              <UiFormControl>
                <TiptapEditor v-bind="componentField" size="xs" />
              </UiFormControl>

              <UiFormMessage />
            </UiFormItem>
          </UiFormField>

          <div class="grid grid-cols-2 gap-8">
            <UiFormField v-slot="{ componentField }" name="menuItem">
              <UiFormItem class="flex flex-col gap-y-2">
                <UiFormLabel>Прикрепить к пункту меню</UiFormLabel>

                <UiSelect v-bind="componentField">
                  <UiFormControl>
                    <UiSelectTrigger class="group">
                      <UiSelectValue
                        placeholder="Выберите из списка"
                        :class="!values.menuItem && 'text-muted-foreground group-hover:dark:text-white'"
                      />
                    </UiSelectTrigger>
                  </UiFormControl>
                  <UiSelectContent>
                    <UiSelectGroup>
                      <UiSelectItem v-for="item of menu?.data" :key="item.id" :value="item.id"> {{ item.name }} </UiSelectItem>
                    </UiSelectGroup>
                  </UiSelectContent>
                </UiSelect>
                <UiFormMessage />
              </UiFormItem>
            </UiFormField>

            <UiFormField v-slot="{ componentField }" name="page">
              <UiFormItem class="flex flex-col gap-y-2">
                <UiFormLabel>Прикрепить к странице</UiFormLabel>

                <UiSelect v-bind="componentField">
                  <UiFormControl>
                    <UiSelectTrigger class="group">
                      <UiSelectValue
                        placeholder="Выберите из списка"
                        :class="!values.page && 'text-muted-foreground group-hover:dark:text-white'"
                      />
                    </UiSelectTrigger>
                  </UiFormControl>
                  <UiSelectContent>
                    <UiSelectGroup>
                      <UiSelectItem v-for="item of pages?.data" :key="item.id" :value="item.id"> {{ item.name }} </UiSelectItem>
                    </UiSelectGroup>
                  </UiSelectContent>
                </UiSelect>
                <UiFormMessage />
              </UiFormItem>
            </UiFormField>
          </div>
        </UiCardContent>
      </UiCard>

      <UiCard v-if="mode === 'material'">
        <UiCardHeader>
          <UiCardTitle>Прикрепить файл</UiCardTitle>
        </UiCardHeader>
        <UiCardContent class="flex flex-col gap-y-2">
          <UiFormField v-slot="{ componentField }" name="resources">
            <UiFormItem class="flex flex-col">
              <UiFormLabel />

              <ChoiceFile v-bind="componentField as any" />
              <List v-if="values.resources?.length" class="flex flex-col gap-3 pt-5">
                <ListItem v-for="item of values.resources" :key="item.url">
                  <MaterialFormChoicedFile :file="item" @on:remove="onFileRemove" />
                </ListItem>
              </List>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>
        </UiCardContent>
      </UiCard>
    </div>
    <div class="grid auto-rows-max gap-8">
      <UiCard>
        <UiCardHeader class="pb-2">
          <UiCardTitle>Статус</UiCardTitle>
          <UiCardDescription> Публикации </UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          <UiFormField v-slot="{ componentField }" name="isPublished">
            <UiFormItem class="flex flex-col gap-y-2">
              <UiFormLabel>Cтатус</UiFormLabel>

              <UiSelect v-bind="componentField">
                <UiFormControl>
                  <UiSelectTrigger class="group">
                    <UiSelectValue
                      placeholder="Выберите статус"
                      :class="!values.isPublished && 'text-muted-foreground group-hover:dark:text-white'"
                    />
                  </UiSelectTrigger>
                </UiFormControl>
                <UiSelectContent>
                  <UiSelectGroup>
                    <UiSelectItem value="true"> Опубликован </UiSelectItem>
                    <UiSelectItem value="false"> Не опубликован </UiSelectItem>
                  </UiSelectGroup>
                </UiSelectContent>
              </UiSelect>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>
        </UiCardContent>
      </UiCard>
      <UiCard>
        <UiCardHeader class="pb-2">
          <UiCardTitle>Дата</UiCardTitle>
          <UiCardDescription> Дата материала </UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          <UiFormField v-slot="{ componentField }" name="date">
            <UiFormItem class="flex flex-col gap-y-2">
              <UiFormLabel>Дата</UiFormLabel>
              <DatePicker v-bind="componentField as any" />
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>
        </UiCardContent>
      </UiCard>
      <UiCard>
        <UiCardHeader class="pb-2">
          <UiCardTitle>Теги</UiCardTitle>
          <UiCardDescription> Теги материала </UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          <UiFormField v-slot="{ componentField }" name="tags">
            <UiFormItem class="flex flex-col gap-y-2">
              <UiFormLabel>Теги</UiFormLabel>
              <ChoiceTags v-if="tags" v-bind="componentField as any" :tags="tags.data" />
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>
        </UiCardContent>
      </UiCard>
    </div>
    <div v-if="mode === 'material-page'" class="col-span-full grid gap-8">
      <UiCard>
        <UiCardHeader class="pb-2">
          <UiCardTitle>Текст</UiCardTitle>
          <UiCardDescription> Основной текст на странице</UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          <UiFormField v-slot="{ componentField }" name="text">
            <UiFormItem class="flex flex-col gap-y-2">
              <UiFormLabel>Текст</UiFormLabel>

              <UiFormControl>
                <TiptapEditor v-bind="componentField" size="md" />
              </UiFormControl>

              <UiFormMessage />
            </UiFormItem>
          </UiFormField>
        </UiCardContent>
      </UiCard>
      <UiCard>
        <UiCardHeader>
          <UiCardTitle>Прикрепить файлы</UiCardTitle>
        </UiCardHeader>
        <UiCardContent class="flex flex-col gap-y-2">
          <UiFormField v-slot="{ componentField }" name="resources">
            <UiFormItem class="flex flex-col">
              <UiFormLabel />

              <ChoiceFile v-bind="componentField as any" mode="many" />
              <List v-if="values.resources?.length" class="flex flex-col gap-3 pt-5">
                <ListItem v-for="item of values.resources" :key="item.url">
                  <MaterialFormFileForm :file="item" @on:remove="onFileRemove" />
                </ListItem>
              </List>
              <UiFormMessage />
            </UiFormItem>
          </UiFormField>
        </UiCardContent>
      </UiCard>
    </div>
  </div>
</template>
