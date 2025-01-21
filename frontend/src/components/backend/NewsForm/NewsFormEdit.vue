<script setup lang="ts">
import { object, string, array } from 'zod';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import type { IFetchError } from 'ofetch';

const { data: tags } = await useFetchSecure<ResponseData<Tags>>('/tags');
const { data: news } = useNuxtData<News>('news-single');

const formSchema = toTypedSchema(
  object({
    id: string(),
    title: string({
      required_error: 'Поле не должно быть пустым',
    }).trim(),
    slug: string({
      required_error: 'Поле не должно быть пустым',
    }).trim(),
    description: string({
      required_error: 'Поле не должно быть пустым',
    }).trim(),
    tags: array(string()).optional().default([]),
    text: string({ required_error: 'Поле не должно быть пустым' }).trim(),
    date: string({ required_error: 'Выберите дату' }).refine((v) => v, { message: 'Выберите дату' }),
    image: string().optional().default('default/placeholder.svg'),
    isPublished: string({
      required_error: 'Выберите статус',
    }).transform((value) => (value === 'true' ? true : false)),
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
      await $fetchSecure(`/news`, { body: values, method: 'PATCH' });
      return 'Новость успешно изменена!';
    } catch (error) {
      const err = (error as IFetchError<ResponseError>).data;
      throw createError({ message: err?.message, statusCode: err?.statusCode });
    }
  };

  toast.promise(promise, {
    loading: 'Сохранение...',
    success: (message: string) => {
      isSaved.value = false;
      navigateTo('/dashboard/news');
      return message;
    },
    error: (err: ResponseError) => {
      isSaved.value = false;
      return err.message;
    },
  });
});

const onClickCancel = () => {
  navigateTo('/dashboard/news');
};

const onUpdateImage = (image: string) => {
  setFieldValue('image', image);
};

const setAliasOnBlurTitle = () => {
  if (values.title && !values.slug) {
    setFieldValue('slug', createAlias(values.title));
  }
};

watch(values, () => {
  if (values.title === '') {
    setFieldValue('title', undefined);
  }

  if (values.slug === '') {
    setFieldValue('slug', undefined);
  }
});

onBeforeMount(() => {
  setFieldValue('id', news.value?.id);
  setFieldValue('title', news.value?.title);
  setFieldValue('slug', news.value?.slug);
  setFieldValue('description', news.value?.description);
  setFieldValue('text', news.value?.text);
  setFieldValue('isPublished', `${news.value?.isPublished}`);
  setFieldValue('date', news.value?.date);
  setFieldValue(
    'tags',
    news.value?.tags.map((tag) => tag.id),
  );
  setFieldValue('image', news.value?.image);
});
</script>

<template>
  <form class="grid gap-5" @submit="onSubmit">
    <div class="flex items-center">
      <div class="mr-auto flex items-center gap-x-2">
        <Icon name="solar:hashtag-square-linear" class="size-5" />
        <p>Редактировать новость</p>
      </div>
      <div class="flex items-center gap-4">
        <UiAlertDialog>
          <UiAlertDialogTrigger as-child>
            <UiButton variant="outline" class="text-muted-foreground"> Отмена </UiButton>
          </UiAlertDialogTrigger>
          <UiAlertDialogContent>
            <UiAlertDialogHeader>
              <UiAlertDialogTitle>Вы уверены?</UiAlertDialogTitle>
              <UiAlertDialogDescription> Вы уверены что хотите отменить редактирование новости? </UiAlertDialogDescription>
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
            <UiCardTitle>Название новости</UiCardTitle>
            <UiCardDescription> Описание новости </UiCardDescription>
          </UiCardHeader>
          <UiCardContent class="flex flex-col gap-y-5">
            <UiFormField v-slot="{ componentField }" name="title">
              <UiFormItem class="flex flex-col gap-y-2">
                <UiFormLabel>Заголовок</UiFormLabel>

                <UiFormControl>
                  <UiInput type="text" placeholder="Заголовок" v-bind="componentField" @blur="setAliasOnBlurTitle" />
                </UiFormControl>

                <UiFormMessage />
              </UiFormItem>
            </UiFormField>
            <UiFormField v-slot="{ componentField }" name="slug">
              <UiFormItem class="flex flex-col gap-y-2">
                <UiFormLabel>Алиас (ЧПУ)</UiFormLabel>

                <UiFormControl>
                  <UiInput type="text" placeholder="алиас" v-bind="componentField" />
                </UiFormControl>

                <UiFormMessage />
              </UiFormItem>
            </UiFormField>

            <UiFormField v-slot="{ componentField }" name="description">
              <UiFormItem class="flex flex-col gap-y-2">
                <UiFormLabel>Краткое описание</UiFormLabel>

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
              <UiCardTitle>Текст новости</UiCardTitle>
              <UiCardDescription> Основной текст новости </UiCardDescription>
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
        </div>
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
            <UiCardDescription> Дата новости </UiCardDescription>
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
        <UiCard class="overflow-hidden">
          <UiCardHeader>
            <UiCardTitle>Изображение</UiCardTitle>
            <UiCardDescription> Изображение новости </UiCardDescription>
          </UiCardHeader>
          <UiCardContent>
            <ChoiceImage :image="news?.image" @on:update-image="onUpdateImage" />
          </UiCardContent>
        </UiCard>
      </div>
      <div class="col-span-full" />
    </div>
  </form>
</template>
