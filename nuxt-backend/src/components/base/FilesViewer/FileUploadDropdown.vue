<script setup lang="ts">
import type { FileUploadTypes } from '.';

const isOpenDropdown = ref<boolean>(false);
const isOpenTooltip = ref<boolean>(false);
const uploadTypeFile = defineModel<FileUploadTypes>('typefiles', { required: true });

const emit = defineEmits(['on:choiced-upload']);

const onClick = () => {
  isOpenDropdown.value = !isOpenDropdown.value;
  isOpenTooltip.value = !isOpenTooltip.value;
};

const onMouseover = () => {
  isOpenTooltip.value = true;
};

const onMouseleave = () => {
  isOpenTooltip.value = false;
};

const onClickUploadFile = (type: FileUploadTypes) => {
  uploadTypeFile.value = type;
  emit('on:choiced-upload');
};
</script>

<template>
  <UiDropdownMenu v-model:open="isOpenDropdown">
    <UiDropdownMenuTrigger as-child>
      <UiTooltipProvider :delay-duration="100">
        <UiTooltip :open="isOpenTooltip">
          <UiTooltipTrigger as-child>
            <UiButton
              variant="ghost"
              size="sm"
              class="ml-auto flex h-full cursor-pointer items-center justify-start gap-2 p-2 dark:text-white"
              @click.prevent="onClick"
              @mouseover="onMouseover"
              @mouseleave="onMouseleave"
            >
              <Icon name="solar:download-square-linear" class="size-5" />
            </UiButton>
          </UiTooltipTrigger>
          <UiTooltipContent> Загрузить </UiTooltipContent>
        </UiTooltip>
      </UiTooltipProvider>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent>
      <UiDropdownMenuLabel>Загрузить</UiDropdownMenuLabel>
      <UiDropdownMenuSeparator />
      <UiDropdownMenuItem @click="onClickUploadFile('images')"> Изображение </UiDropdownMenuItem>
      <UiDropdownMenuItem @click="onClickUploadFile('docs')"> Документ </UiDropdownMenuItem>
      <UiDropdownMenuItem @click="onClickUploadFile('video')"> Видео </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>
