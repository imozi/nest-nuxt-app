<script setup lang="ts">
import { array, object, string } from 'zod';
import { useForm } from 'vee-validate';

const menuItem = defineModel<MenuItem>('item');

const isOpenDialog = ref<boolean>(false);
const isSaved = ref<boolean>(false);

const { data: menu } = useNuxtData<ResponseData<Menu>>('menu');

const emit = defineEmits(['on:saved']);

const formSchema = toTypedSchema(
  object({
    id: string().trim(),
    name: string({
      required_error: 'Поле не должно быть пустым',
    }).trim(),
    slug: string({
      required_error: 'Поле не должно быть пустым',
    }).trim(),
    description: string().optional(),
    menu: array(string()).min(1, { message: 'Должен быть указан хотя бы один пункт' }).default([]),
  }),
);

onUpdated(() => {
  setFieldValue('id', menuItem.value?.id);
  setFieldValue('name', menuItem.value?.name);
  setFieldValue('slug', menuItem.value?.slug);
  setFieldValue('description', menuItem.value?.description ? menuItem.value?.description : undefined);
  setFieldValue(
    'menu',
    menuItem.value?.menu.map((item) => item.name),
  );
});

const { handleSubmit, setFieldValue } = useForm({
  validationSchema: formSchema,
  keepValuesOnUnmount: true,
});

const onSubmit = handleSubmit(async (values) => {
  isSaved.value = true;

  const selectedMenu = values.menu.map((item) => menu.value?.data.find((elm) => elm.name === item)?.id);

  const promise = async () => {
    try {
      await $fetchSecure(`/menu/items`, { body: { ...values, menu: selectedMenu }, method: 'PATCH' });
      emit('on:saved');
      isOpenDialog.value = false;
      return 'Пункт меню успешно изменен!';
    } catch (error) {
      const err = (error as IFetchError<ResponseError>).data;
      throw createError({ message: err?.message, statusCode: err?.statusCode });
    }
  };

  toast.promise(promise, {
    loading: 'Сохранение...',
    success: (message: string) => {
      isSaved.value = false;
      return message;
    },
    error: (message: string) => {
      isSaved.value = false;
      return message;
    },
  });
});
</script>

<template>
  <UiDialog>
    <UiDialogContent class="menu__dialog">
      <form class="menu__form" @submit="onSubmit">
        <UiDialogHeader>
          <UiDialogTitle>Изменить пункт меню</UiDialogTitle>
          <UiDialogDescription>Заполните данные</UiDialogDescription>
        </UiDialogHeader>

        <UiFormField v-slot="{ componentField }" name="name">
          <UiFormItem class="flex flex-col gap-y-2">
            <UiFormLabel>Наименование</UiFormLabel>

            <UiFormControl>
              <UiInput type="text" placeholder="Наименование" v-bind="componentField" />
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
            <UiFormLabel>Описание</UiFormLabel>

            <UiFormControl>
              <TiptapEditor v-bind="componentField" size="xs" />
            </UiFormControl>

            <UiFormMessage />
          </UiFormItem>
        </UiFormField>

        <UiFormField v-slot="{ componentField }" name="menu">
          <UiFormItem class="flex flex-col gap-y-2">
            <UiFormLabel>Прикрепить к пункту меню</UiFormLabel>
            <ChoiceSelect v-if="menu" v-bind="componentField" :data="menu.data" />
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>

        <UiDialogFooter>
          <UiButton type="submit" class="dark:text-white" :disabled="isSaved"> Сохраненить </UiButton>
        </UiDialogFooter>
      </form>
    </UiDialogContent>
  </UiDialog>
</template>
