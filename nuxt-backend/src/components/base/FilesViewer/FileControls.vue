<script setup lang="tsx">
import type { FileUploadTypes } from '.';

type FileControlsProps = {
  choice?: boolean;
  deleted?: boolean;
};

const { choice = false, deleted = false } = defineProps<FileControlsProps>();

const emit = defineEmits(['on:confirmed-delete', 'on:confirmed-choice', 'on:file-uploaded']);

const uploadTypeFile = defineModel<FileUploadTypes>('typefiles', { required: true });
const dropDownUploadTypeFile = ref<FileUploadTypes>('all');
const countFiles = defineModel<number>('countfiles', { required: true });
const isOpenDrawer = ref<boolean>(false);

const openDrawer = () => {
  isOpenDrawer.value = !isOpenDrawer.value;
};

const onConfirmedChoice = () => {
  emit('on:confirmed-choice');
};

const onConfirmedDelete = () => {
  emit('on:confirmed-delete');
};

const onFileUploaded = () => {
  emit('on:file-uploaded');
};
</script>

<template>
  <UiTooltipProvider :delay-duration="100">
    <List class="file-controls">
      <ListItem v-if="choice" class="file-controls__item">
        <FilesViewerFileChoice :count="countFiles" @on:choice-confirmed="onConfirmedChoice" />
      </ListItem>
      <ListItem v-if="deleted" class="file-controls__item">
        <FilesViewerFileDelete :count="countFiles" @on:delete-confirmed="onConfirmedDelete" />
      </ListItem>
      <ListItem class="file-controls__item">
        <ClientOnly>
          <FilesViewerFileUploadDropdown
            v-if="uploadTypeFile === 'all'"
            v-model:typefiles="dropDownUploadTypeFile"
            @on:choiced-upload="openDrawer"
          />
          <FilesViewerFileUpload v-if="uploadTypeFile !== 'all'" :type="uploadTypeFile" @on:finished="onFileUploaded" />
          <FilesViewerFileUpload
            v-else
            v-model:is-open-drawe="isOpenDrawer"
            show-trigger
            :type="dropDownUploadTypeFile"
            @on:finished="onFileUploaded"
          />
        </ClientOnly>
      </ListItem>
    </List>
  </UiTooltipProvider>
</template>

<style lang="scss">
.file-controls {
  @apply flex h-full gap-x-2;
}
</style>
