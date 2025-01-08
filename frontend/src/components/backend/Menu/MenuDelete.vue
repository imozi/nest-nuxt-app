<script setup lang="ts">
import { object, string } from 'zod';
import { useForm } from 'vee-validate';

const { data: menu } = useNuxtData<ResponeData<Menu>>('menu');

const isOpenDialog = ref<boolean>(false);
const isOpenTooltip = ref<boolean>(false);
const isSaved = ref<boolean>(false);
const emit = defineEmits(['on:deleted']);

const formSchema = toTypedSchema(
  object({
    id: string({
      required_error: 'Поле не должно быть пустым',
    }),
  }),
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
  isSaved.value = true;

  const promise = async () => {
    try {
      await $fetchSecure(`/menu`, { body: values, method: 'DELETE' });
      isOpenDialog.value = false;
      emit('on:deleted');
      return 'Меню успешно удалено!';
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
              <Icon name="solar:file-remove-outline" class="size-5" />
            </UiButton>
          </UiTooltipTrigger>
          <UiTooltipContent>
            <p>Удалить меню</p>
          </UiTooltipContent>
        </UiTooltip>
      </UiTooltipProvider>
    </UiDialogTrigger>

    <UiDialogContent class="menu__dialog">
      <form class="menu__form" @submit="onSubmit">
        <UiDialogHeader>
          <UiDialogTitle>Удалить меню</UiDialogTitle>
          <UiDialogDescription>Выберите меню</UiDialogDescription>
        </UiDialogHeader>

        <UiFormField v-slot="{ componentField }" name="id">
          <UiFormItem>
            <UiFormLabel>Наименование</UiFormLabel>

            <UiSelect v-bind="componentField">
              <UiFormControl>
                <UiSelectTrigger>
                  <UiSelectValue placeholder="Выберите из списка" />
                </UiSelectTrigger>
              </UiFormControl>
              <UiSelectContent>
                <UiSelectGroup>
                  <UiSelectItem v-for="item of menu?.data" :key="item.id" :value="item.id">
                    {{ item.name }}
                  </UiSelectItem>
                </UiSelectGroup>
              </UiSelectContent>
            </UiSelect>

            <UiFormMessage />
          </UiFormItem>
        </UiFormField>

        <UiDialogFooter>
          <UiButton type="submit" class="dark:text-white" :disabled="isSaved"> Удалить </UiButton>
        </UiDialogFooter>
      </form>
    </UiDialogContent>
  </UiDialog>
</template>

<style lang="scss">
.menu__form {
  @apply flex flex-col gap-y-5;
}

.menu__dialog {
  @apply max-w-96;
}
</style>
