<script setup lang="ts">
import { object, string } from 'zod';
import { useForm } from 'vee-validate';

const emit = defineEmits(['on:created']);

const formSchema = toTypedSchema(
  object({
    name: string({
      required_error: 'Поле не должно быть пустым',
    }).trim(),
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
      await $fetchSecure(`/tags`, { body: values, method: 'POST' });
      emit('on:created');
      return 'Тег успешно создан!';
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
    error: (err: ResponseError) => {
      isSaved.value = false;
      return err.message;
    },
  });
});

watch(values, () => {
  if (values.name === '') {
    setFieldValue('name', undefined);
  }
});
</script>

<template>
  <UiDialog>
    <UiDialogContent class="tags__dialog">
      <UiDialogHeader>
        <UiDialogTitle>Создать тег</UiDialogTitle>
        <UiDialogDescription> Введите новое название тега </UiDialogDescription>
      </UiDialogHeader>
      <form class="tags__form" @submit="onSubmit">
        <UiFormField v-slot="{ componentField }" name="name">
          <UiFormItem class="flex flex-col gap-y-2">
            <UiFormLabel>Наименование</UiFormLabel>

            <UiFormControl>
              <UiInput type="text" placeholder="Наименование" v-bind="componentField" />
            </UiFormControl>

            <UiFormMessage />
          </UiFormItem>
        </UiFormField>

        <UiDialogFooter>
          <UiButton type="submit" class="dark:text-white" :disabled="isSaved"> Сохранить </UiButton>
        </UiDialogFooter>
      </form>
    </UiDialogContent>
  </UiDialog>
</template>
