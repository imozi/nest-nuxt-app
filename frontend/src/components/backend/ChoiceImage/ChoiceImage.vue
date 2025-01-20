<script setup lang="ts">
interface ChoiceImageProps {
  image?: string;
}

const { image } = defineProps<ChoiceImageProps>();
const srcImage = ref<string | undefined>(useAssetsPath(image ? image : '/public/default/placeholder.svg'));
const placeholder = computed(() => useAssetsPath('/public/default/placeholder.svg'));
const isOpen = ref<boolean>(false);
const emit = defineEmits(['on:update-image']);

const onSelectFile = (file: FileApi) => {
  isOpen.value = false;
  srcImage.value = useAssetsPath(file.url as string);
  emit('on:update-image', file.url);
};
</script>

<template>
  <UiDialog v-model:open="isOpen">
    <UiDialogTrigger as-child>
      <UiButton variant="ghost" class="flex h-full w-full p-0">
        <UnLazyImage :key="srcImage" :src="srcImage" :data-src="srcImage" :placeholder-src="placeholder" class="h-full w-full rounded-md" />
      </UiButton>
    </UiDialogTrigger>
    <UiDialogContent class="h-full max-h-[95dvh] max-w-screen-xl grid-rows-[auto_minmax(0,1fr)_auto] p-0">
      <UiDialogHeader class="p-6 pb-0">
        <UiDialogTitle>Выбрите файл</UiDialogTitle>
        <UiDialogDescription> Изображения для новости </UiDialogDescription>
      </UiDialogHeader>

      <div class="file-content-dialog grid gap-4 overflow-y-auto px-6 py-4">
        <div class="flex flex-col justify-between">
          <FilesViewer type="images" double-click-choice disabled choice @on:chice-file="onSelectFile" />
        </div>
      </div>
    </UiDialogContent>
  </UiDialog>
</template>

<style lang="scss">
.file-content-dialog {
  &::-webkit-scrollbar {
    @apply w-0;
  }
}
</style>
