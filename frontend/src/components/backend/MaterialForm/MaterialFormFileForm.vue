<script setup lang="ts">
type MaterialChoicedFile = {
  url: string;
  name: string;
  type: string;
  originalName: string;
  extention: string;
  size: string;
  text?: string;
  description?: string;
};

const file = defineModel<MaterialChoicedFile>('file', { required: true });
const emit = defineEmits(['on:remove']);

const onClickRemove = () => {
  emit('on:remove', file.value.name);
};
</script>

<template>
  <div class="choiced-file-full">
    <div class="choiced-file-full__item">
      <MaterialFormChoicedFile :file="file" @on:remove="onClickRemove" />
    </div>
    <UiSeparator />
    <div class="choiced-file-full__data">
      <UiFormField name="">
        <UiFormItem class="flex flex-col gap-y-2">
          <UiFormLabel>Наименование</UiFormLabel>
        </UiFormItem>
        <UiFormControl>
          <UiInput v-model:model-value="file.originalName" type="text" />
        </UiFormControl>
      </UiFormField>
      <UiFormField name="">
        <UiFormItem class="flex flex-col gap-y-2">
          <UiFormLabel>Краткое описание</UiFormLabel>
          <UiFormControl>
            <TiptapEditor :model-value="file.description" size="default" />
          </UiFormControl>
          <UiFormMessage />
        </UiFormItem>
      </UiFormField>
      <UiFormField name="">
        <UiFormItem class="flex flex-col gap-y-2">
          <UiFormLabel>Текст</UiFormLabel>
          <UiFormControl>
            <TiptapEditor :model-value="file.text" size="sm" />
          </UiFormControl>
          <UiFormMessage />
        </UiFormItem>
      </UiFormField>
    </div>
  </div>
</template>

<style lang="scss">
.choiced-file-full {
  @apply flex flex-col gap-y-5 rounded-md bg-zinc-50 p-4 py-8 dark:bg-zinc-800;

  &__data {
    @apply flex flex-col gap-y-5 px-4;
  }
}
</style>
