<script setup lang="ts">
import { object, string } from 'zod';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import type { IFetchError } from 'ofetch';

const { data: menu } = useAsyncData<ResponseData<MenuItem>>('menu-items', () => {
  return $fetchSecure(`/menu/items`);
});

const formSchema = toTypedSchema(
  object({
    name: string({
      required_error: 'Поле не должно быть пустым',
    }).trim(),
    slug: string({
      required_error: 'Поле не должно быть пустым',
    }).trim(),
    description: string({
      required_error: 'Поле не должно быть пустым',
    })
      .trim()
      .optional(),
    text: string({ required_error: 'Поле не должно быть пустым' }).trim().optional(),
    menuItem: string({ required_error: 'Поле не должно быть пустым' }).trim(),
  }),
);

const { handleSubmit, setFieldValue, values } = useForm({
  validationSchema: formSchema,
});
const isSaved = ref<boolean>(false);

const onSubmit = handleSubmit(async (values) => {
  isSaved.value = true;

  const promise = async () => {
    try {
      await $fetchSecure(`/pages`, { body: values, method: 'POST' });
      return 'Страница успешно создана!';
    } catch (error) {
      const err = (error as IFetchError<ResponseError>).data;
      throw new Error(err?.message);
    }
  };

  toast.promise(promise, {
    loading: 'Сохранение...',
    success: (message: string) => {
      isSaved.value = false;
      navigateTo('/dashboard/pages');
      return message;
    },
    error: (err: ResponseError) => {
      isSaved.value = false;
      return err.message;
    },
  });
});

const onClickCancel = () => {
  navigateTo('/dashboard/pages');
};

const setAliasOnBlurName = () => {
  if (values.name && !values.slug) {
    setFieldValue('slug', createAlias(values.name));
  }
};

watch(values, () => {
  if (values.name === '') {
    setFieldValue('name', undefined);
  }

  if (values.slug === '') {
    setFieldValue('slug', undefined);
  }
});
</script>

<template>
  <form class="grid gap-5" @submit="onSubmit">
    <div class="flex items-center">
      <div class="mr-auto flex items-center gap-x-2">
        <Icon name="solar:hashtag-square-linear" class="size-5" />
        <p>Создать страницу</p>
      </div>
      <div class="flex items-center gap-4">
        <UiAlertDialog>
          <UiAlertDialogTrigger as-child>
            <UiButton variant="outline" class="text-muted-foreground"> Отмена </UiButton>
          </UiAlertDialogTrigger>
          <UiAlertDialogContent>
            <UiAlertDialogHeader>
              <UiAlertDialogTitle>Вы уверены?</UiAlertDialogTitle>
              <UiAlertDialogDescription> Вы уверены что хотите отменить создание страницы? </UiAlertDialogDescription>
            </UiAlertDialogHeader>
            <UiAlertDialogFooter>
              <UiAlertDialogCancel>Нет</UiAlertDialogCancel>
              <UiAlertDialogAction class="text-white" :disabled="isSaved" @click="onClickCancel"> Да </UiAlertDialogAction>
            </UiAlertDialogFooter>
          </UiAlertDialogContent>
        </UiAlertDialog>

        <UiButton type="submit" class="dark:text-white" :disabled="isSaved"> Сохранить </UiButton>
      </div>
    </div>
    <UiSeparator />
    <div class="grid grid-cols-3 gap-8">
      <div class="col-span-2 grid auto-rows-max gap-8 break-all">
        <UiCard>
          <UiCardHeader class="pb-2">
            <UiCardTitle>Название страницы</UiCardTitle>
            <UiCardDescription> Описание страницы </UiCardDescription>
          </UiCardHeader>
          <UiCardContent class="flex flex-col gap-y-5">
            <UiFormField v-slot="{ componentField }" name="name">
              <UiFormItem class="flex flex-col gap-y-2">
                <UiFormLabel>Наименование</UiFormLabel>

                <UiFormControl>
                  <UiInput type="text" placeholder="Наименование" v-bind="componentField" @blur="setAliasOnBlurName" />
                </UiFormControl>

                <UiFormMessage />
              </UiFormItem>
            </UiFormField>
            <UiFormField v-slot="{ componentField }" name="slug">
              <UiFormItem class="flex flex-col gap-y-2">
                <UiFormLabel>Алиас (ЧПУ)</UiFormLabel>

                <UiFormControl>
                  <UiInput type="text" placeholder="Алиас" v-bind="componentField" />
                </UiFormControl>

                <UiFormMessage />
              </UiFormItem>
            </UiFormField>

            <UiFormField v-slot="{ componentField }" name="description">
              <UiFormItem class="flex flex-col gap-y-2">
                <UiFormLabel>Краткое описание (не обязательно)</UiFormLabel>

                <UiFormControl>
                  <TiptapEditor v-bind="componentField" size="xs" />
                </UiFormControl>

                <UiFormMessage />
              </UiFormItem>
            </UiFormField>
          </UiCardContent>
        </UiCard>

        <div class="grid gap-8">
          <UiCard>
            <UiCardHeader class="pb-2">
              <UiCardTitle>Текст</UiCardTitle>
              <UiCardDescription> Основной текст на странице </UiCardDescription>
            </UiCardHeader>
            <UiCardContent>
              <UiFormField v-slot="{ componentField }" name="text">
                <UiFormItem class="flex flex-col gap-y-2">
                  <UiFormLabel>Текст (не обязательно)</UiFormLabel>

                  <UiFormControl>
                    <TiptapEditor v-bind="componentField" size="md" />
                  </UiFormControl>

                  <UiFormMessage />
                </UiFormItem>
              </UiFormField>
            </UiCardContent>
          </UiCard>
        </div>
      </div>
      <div class="grid auto-rows-max gap-8">
        <UiCard>
          <UiCardHeader class="pb-2">
            <UiCardTitle>Прикрепить</UiCardTitle>
            <UiCardDescription> Выберите пункт меню </UiCardDescription>
          </UiCardHeader>
          <UiCardContent>
            <UiFormField v-slot="{ componentField }" name="menuItem">
              <UiFormItem class="flex flex-col gap-y-2">
                <UiFormLabel>Наименование</UiFormLabel>

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
          </UiCardContent>
        </UiCard>
      </div>
      <div class="col-span-full" />
    </div>
  </form>
</template>
