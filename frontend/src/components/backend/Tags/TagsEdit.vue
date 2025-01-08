<script setup lang="ts">
import { object, string } from 'zod';
import { useForm } from 'vee-validate';

const tag = defineModel<Tags>('tag');
const emit = defineEmits(['on:saved']);

const formSchema = toTypedSchema(
  object({
    id: string().trim(),
    name: string({
      required_error: 'Поле не должно быть пустым',
    }),
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
      await $fetchSecure(`/tags`, { body: values, method: 'PATCH' });
      emit('on:saved');
      return 'Тег успешно изменен!';
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

onUpdated(() => {
  setFieldValue('id', tag.value?.id);
  setFieldValue('name', tag.value?.name);
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
        <UiDialogTitle>Изменить тег</UiDialogTitle>
        <UiDialogDescription> Изменить название тега </UiDialogDescription>
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
