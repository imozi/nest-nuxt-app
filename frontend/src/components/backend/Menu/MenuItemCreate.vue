<script setup lang="ts">
import { array, object, string } from 'zod';
import { useForm, configure } from 'vee-validate';

configure({
  validateOnBlur: false,
});

const isOpenDialog = ref<boolean>(false);
const isOpenTooltip = ref<boolean>(false);
const isSaved = ref<boolean>(false);

const { data: menu } = useNuxtData<ResponeData<Menu>>('menu');

const emit = defineEmits(['on:created']);

const formSchema = toTypedSchema(
  object({
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

const { handleSubmit, values, setFieldValue, resetForm } = useForm({
  validationSchema: formSchema,
  keepValuesOnUnmount: true,
});

const onSubmit = handleSubmit(async (values) => {
  isSaved.value = true;

  const selectedMenu = values.menu.map((item) => menu.value?.data.find((elm) => elm.name === item)?.id);

  const promise = async () => {
    try {
      await $fetchSecure(`/menu/items`, { body: { ...values, menu: selectedMenu }, method: 'POST' });
      emit('on:created');
      isOpenDialog.value = false;
      resetForm();
      return 'Пункт меню успешно создано!';
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

onUnmounted(() => {
  setFieldValue('menu', []);
});

const setAliasOnBlurName = () => {
  if (values.name && !values.slug) {
    setFieldValue('slug', createAlias(values.name));
  }
};

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
              <Icon name="solar:menu-dots-square-outline" class="size-5" />
            </UiButton>
          </UiTooltipTrigger>
          <UiTooltipContent>
            <p>Создать пункт меню</p>
          </UiTooltipContent>
        </UiTooltip>
      </UiTooltipProvider>
    </UiDialogTrigger>

    <UiDialogContent class="menu__dialog">
      <form class="menu__form" @submit="onSubmit">
        <UiDialogHeader>
          <UiDialogTitle>Создать пункт меню</UiDialogTitle>
          <UiDialogDescription>Заполните форму</UiDialogDescription>
        </UiDialogHeader>

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
          <UiButton type="submit" class="dark:text-white" :disabled="isSaved"> Создать </UiButton>
        </UiDialogFooter>
      </form>
    </UiDialogContent>
  </UiDialog>
</template>
