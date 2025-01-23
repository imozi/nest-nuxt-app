<script setup lang="ts">
import { object, string } from 'zod';
import { useForm } from 'vee-validate';

const isOpenDialog = ref<boolean>(false);
const isOpenTooltip = ref<boolean>(false);
const isSaved = ref<boolean>(false);

const emit = defineEmits(['on:created']);

const formSchema = toTypedSchema(
  object({
    name: string({
      required_error: 'Поле не должно быть пустым',
    }).trim(),
    email: string({
      required_error: 'Поле не должно быть пустым',
    }).trim(),
    position: string({
      required_error: 'Поле не должно быть пустым',
    }).trim(),
    organization: string({
      required_error: 'Поле не должно быть пустым',
    }).trim(),
    question: string({
      required_error: 'Поле не должно быть пустым',
    }).trim(),
    remoteId: string({
      required_error: 'Поле не должно быть пустым',
    })
      .trim()
      .default('000000000'),
    status: string().default('new'),
  }),
);

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
  isSaved.value = true;

  const promise = async () => {
    try {
      await $fetchSecure(`/support-mail`, { body: values, method: 'POST' });
      emit('on:created');
      isOpenDialog.value = false;
      resetForm();
      return 'Обращение успешно создано!';
    } catch (error) {
      const err = (error as IFetchError<ResponseError>).data;
      throw new Error(err?.message);
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

const onClick = () => {
  isOpenDialog.value = !isOpenDialog.value;
  isOpenTooltip.value = !isOpenTooltip.value;
};

const onMouseover = () => {
  isOpenTooltip.value = true;
};

const onMouseleave = () => {
  isOpenTooltip.value = false;
};
</script>

<template>
  <UiDialog v-model:open="isOpenDialog">
    <UiDialogTrigger as-child>
      <UiTooltipProvider :delay-duration="100">
        <UiTooltip :open="isOpenTooltip">
          <UiTooltipTrigger as-child>
            <UiButton variant="secondary" size="icon" @click.prevent="onClick" @mouseover="onMouseover" @mouseleave="onMouseleave">
              <Icon name="solar:add-square-outline" class="size-5" />
            </UiButton>
          </UiTooltipTrigger>
          <UiTooltipContent>
            <p>Создать обращение</p>
          </UiTooltipContent>
        </UiTooltip>
      </UiTooltipProvider>
    </UiDialogTrigger>

    <UiDialogContent class="support__dialog">
      <form class="support__form" @submit="onSubmit">
        <UiDialogHeader>
          <UiDialogTitle>Создать новое обращение</UiDialogTitle>
          <UiDialogDescription>Заполните форму</UiDialogDescription>
        </UiDialogHeader>

        <UiFormField v-slot="{ componentField }" name="name">
          <UiFormItem class="flex flex-col gap-y-2">
            <UiFormLabel>ФИО</UiFormLabel>

            <UiFormControl>
              <UiInput type="text" placeholder="ФИО" v-bind="componentField" />
            </UiFormControl>

            <UiFormMessage />
          </UiFormItem>
        </UiFormField>

        <UiFormField v-slot="{ componentField }" name="email">
          <UiFormItem class="flex flex-col gap-y-2">
            <UiFormLabel>Электронная почта</UiFormLabel>

            <UiFormControl>
              <UiInput type="email" placeholder="example@mail.ru" v-bind="componentField" />
            </UiFormControl>

            <UiFormMessage />
          </UiFormItem>
        </UiFormField>

        <UiFormField v-slot="{ componentField }" name="organization">
          <UiFormItem class="flex flex-col gap-y-2">
            <UiFormLabel>Организация</UiFormLabel>

            <UiFormControl>
              <UiInput type="text" placeholder="Организация" v-bind="componentField" />
            </UiFormControl>

            <UiFormMessage />
          </UiFormItem>
        </UiFormField>

        <UiFormField v-slot="{ componentField }" name="position">
          <UiFormItem class="flex flex-col gap-y-2">
            <UiFormLabel>Должность</UiFormLabel>

            <UiFormControl>
              <UiInput type="text" placeholder="Должность" v-bind="componentField" />
            </UiFormControl>

            <UiFormMessage />
          </UiFormItem>
        </UiFormField>

        <UiFormField v-slot="{ componentField }" name="question">
          <UiFormItem class="flex flex-col gap-y-2">
            <UiFormLabel>Проблема</UiFormLabel>

            <UiFormControl>
              <UiTextarea type="text" placeholder="Текст..." v-bind="componentField" class="min-h-52" />
            </UiFormControl>

            <UiFormMessage />
          </UiFormItem>
        </UiFormField>

        <UiFormField v-slot="{ componentField }" name="remoteId">
          <UiFormItem class="flex flex-col gap-y-2">
            <UiFormLabel>Идентификатор ПО “Ассистент”</UiFormLabel>

            <UiFormControl>
              <UiInput type="text" placeholder="000000000" v-bind="componentField" />
            </UiFormControl>

            <UiFormMessage />
          </UiFormItem>
        </UiFormField>

        <UiDialogFooter>
          <UiButton type="submit" class="dark:text-white" :disabled="isSaved"> Создать </UiButton>
        </UiDialogFooter>
      </form>
    </UiDialogContent>
  </UiDialog>
</template>

<style lang="scss">
.support__form {
  @apply flex flex-col gap-y-5;
}

.support__dialog {
  @apply max-w-[500px];
}
</style>
