<script setup lang="ts">
import { object, string, array } from 'zod';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import type { IFetchError } from 'ofetch';

// const { data } = useAsyncData<ResponeWithPagination<Tags>>('tags', () => {
//   return $fetch(`/api/tags`);
// });

const formSchema = toTypedSchema(
  object({
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
    }).transform((value) => Boolean(value)),
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
      await $fetch(`/api/posts`, { body: values, method: 'POST' });
      return 'Новость успешно создана!';
    } catch (error) {
      const err = (error as IFetchError<ResponseError>).data;
      throw createError({ message: err?.message, statusCode: err?.statusCode });
    }
  };

  toast.promise(promise, {
    loading: 'Сохранение...',
    success: (message: string) => {
      isSaved.value = false;
      navigateTo('/news');
      return message;
    },
    error: (message: string) => {
      isSaved.value = false;
      return message;
    },
  });
});

const onClickCancel = () => {
  navigateTo('/dashboard/news');
};
const onUpdateDate = (date: string) => {
  setFieldValue('date', date);
};

const onUpdateImage = (image: string) => {
  setFieldValue('image', image);
};

const onUpdateTags = (arr: string[]) => {
  setFieldValue('tags', arr);
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
</script>

<template>
  <form class="grid gap-8" @submit="onSubmit">
    <div class="flex items-center">
      <div class="mr-auto flex items-center">
        <h3 class="text-2xl font-semibold leading-none tracking-tight">Создать новость</h3>
      </div>
      <div class="flex items-center gap-4">
        <UiAlertDialog>
          <UiAlertDialogTrigger as-child>
            <UiButton variant="outline" class="text-muted-foreground"> Отмена </UiButton>
          </UiAlertDialogTrigger>
          <UiAlertDialogContent>
            <UiAlertDialogHeader>
              <UiAlertDialogTitle>Вы уверены?</UiAlertDialogTitle>
              <UiAlertDialogDescription> Вы уверены что хотите отменить создание новости? </UiAlertDialogDescription>
            </UiAlertDialogHeader>
            <UiAlertDialogFooter>
              <UiAlertDialogCancel>Нет</UiAlertDialogCancel>
              <UiAlertDialogAction class="text-white" :disabled="isSaved" @click="onClickCancel">
                Да
              </UiAlertDialogAction>
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
              <UiFormItem v-auto-animate="{ duration: 200 }" class="flex flex-col gap-y-2">
                <UiFormLabel>Заголовок</UiFormLabel>

                <UiFormControl>
                  <UiInput type="text" placeholder="Заголовок" v-bind="componentField" @blur="setAliasOnBlurTitle" />
                </UiFormControl>

                <UiFormMessage />
              </UiFormItem>
            </UiFormField>
            <UiFormField v-slot="{ componentField }" name="slug">
              <UiFormItem v-auto-animate="{ duration: 200 }" class="flex flex-col gap-y-2">
                <UiFormLabel>Алиас (ЧПУ)</UiFormLabel>

                <UiFormControl>
                  <UiInput type="text" placeholder="алиас" v-bind="componentField" />
                </UiFormControl>

                <UiFormMessage />
              </UiFormItem>
            </UiFormField>

            <UiFormField v-slot="{ componentField }" name="description">
              <UiFormItem v-auto-animate="{ duration: 200 }" class="flex flex-col gap-y-2">
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
                <UiFormItem v-auto-animate="{ duration: 200 }" class="flex flex-col gap-y-2">
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
              <UiFormItem v-auto-animate="{ duration: 200 }" class="flex flex-col gap-y-2">
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
            <DatePicker name="date" @on:update-date="onUpdateDate" />
          </UiCardContent>
        </UiCard>
        <UiCard>
          <UiCardHeader class="pb-2">
            <UiCardTitle>Теги</UiCardTitle>
            <UiCardDescription> Теги новости </UiCardDescription>
          </UiCardHeader>
          <UiCardContent>
            <UiFormField name="tags">
              <UiFormItem v-auto-animate="{ duration: 200 }" class="flex flex-col gap-y-2">
                <UiFormLabel>Теги</UiFormLabel>
                <ChoiceTags :tags="[{ id: 'sad', name: 'Инструкции' }]" @on:change-tags="onUpdateTags" />
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
            <ChoiceImage @on:update-image="onUpdateImage" />
          </UiCardContent>
        </UiCard>
      </div>
      <div class="col-span-full" />
    </div>
  </form>
</template>
