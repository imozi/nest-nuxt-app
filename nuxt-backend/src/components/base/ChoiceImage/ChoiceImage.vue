<script setup lang="ts">
import type { FileUploadTypes } from '../FilesViewer';

interface ChoiceImageProps {
  image?: string;
}

const { image } = defineProps<ChoiceImageProps>();
const srcImage = ref<string | undefined>(useAssetsPath(image ? image : 'public/default/placeholder.svg'));
const placeholder = computed(() => useAssetsPath('public/default/placeholder.svg'));
const isOpen = ref<boolean>(false);
const isLoadingFiles = ref<boolean>(true);
const emit = defineEmits(['on:update-image']);
const typeFile = ref<FileUploadTypes>('images');

const onSelectFile = (url: string) => {
  isOpen.value = false;
  srcImage.value = useAssetsPath(url as string);
  emit('on:update-image', url);
};

const onMountedFiles = () => {
  isLoadingFiles.value = false;
};

watch(isOpen, () => {
  if (!isLoadingFiles.value) {
    isLoadingFiles.value = true;
  }
});
</script>

<template>
  <UiDialog v-model:open="isOpen">
    <UiDialogTrigger as-child>
      <UiButton variant="ghost" class="flex h-full w-full p-0">
        <UnLazyImage
          :key="srcImage"
          :src="srcImage"
          :data-src="srcImage"
          :placeholder-src="placeholder"
          class="h-full w-full rounded-md"
        />
      </UiButton>
    </UiDialogTrigger>
    <UiDialogContent class="h-full max-h-[95dvh] max-w-screen-xl grid-rows-[auto_minmax(0,1fr)_auto] p-0">
      <UiDialogHeader class="p-6 pb-0">
        <UiDialogTitle>Выбрите файл</UiDialogTitle>
        <UiDialogDescription> Изображения для новости </UiDialogDescription>
      </UiDialogHeader>

      <div class="grid gap-4 overflow-y-auto px-6 py-4">
        <div class="flex flex-col justify-between">
          <!-- <UiSkeleton v-if="isLoadingFiles" class="h-full w-full dark:bg-zinc-900" /> -->
          <FilesViewer v-model:tab="typeFile" />
          <!-- <FileViewer acvite-tab="images" @on:select-file="onSelectFile" @on:mounted="onMountedFiles" /> -->
        </div>
      </div>
    </UiDialogContent>
  </UiDialog>
</template>

<style lang="css"></style>
