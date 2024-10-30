<script setup lang="tsx">
import type { FileUploadTypes } from '.';

const uploadTypeFile = defineModel<FileUploadTypes>('typefiles', { required: true });
const dropDownUploadTypeFile = ref<FileUploadTypes>('all');
const countFiles = defineModel<number>('countfiles', { required: true });
const isOpenDrawer = ref<boolean>(false);

const openDrawer = () => {
  isOpenDrawer.value = !isOpenDrawer.value;
};
</script>

<template>
  <UiTooltipProvider :delay-duration="100">
    <List class="file-controls">
      <ListItem class="file-controls__item">
        <FilesViewerFileDelete :count="countFiles" />
      </ListItem>
      <ListItem class="file-controls__item">
        <ClientOnly>
          <FilesViewerFileUploadDropdown
            v-if="uploadTypeFile === 'all'"
            v-model:typefiles="dropDownUploadTypeFile"
            @on:choiced-upload="openDrawer"
          />
          <FilesViewerFileUpload v-if="uploadTypeFile !== 'all'" :type="uploadTypeFile" />
          <FilesViewerFileUpload
            v-else
            v-model:is-open-drawe="isOpenDrawer"
            show-trigger
            :type="dropDownUploadTypeFile"
          />
        </ClientOnly>
      </ListItem>
    </List>
  </UiTooltipProvider>
</template>

<style lang="scss">
.file-controls {
  @apply flex h-full gap-x-1;
}
</style>
