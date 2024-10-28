<script setup lang="tsx">
import type { FileUploadTypes } from '.';

const uploadTypeFile = defineModel<FileUploadTypes>('typefiles', { required: true });
const countFiles = defineModel<number>('countfiles', { required: true });
</script>

<template>
  <UiTooltipProvider :delay-duration="100">
    <List class="file-controls">
      <ListItem class="file-controls__item">
        <UiTooltip :disabled="!countFiles">
          <UiTooltipTrigger as="div">
            <FilesViewerFileDelete :count="countFiles" />
          </UiTooltipTrigger>
          <UiTooltipContent> Удалить</UiTooltipContent>
        </UiTooltip>
      </ListItem>
      <ListItem class="file-controls__item">
        <UiTooltip>
          <UiTooltipTrigger as="div">
            <ClientOnly>
              <FilesViewerFileUpload :type="uploadTypeFile" />
            </ClientOnly>
          </UiTooltipTrigger>
          <UiTooltipContent> Загрузить </UiTooltipContent>
        </UiTooltip>
      </ListItem>
    </List>
  </UiTooltipProvider>
</template>

<style lang="scss">
.file-controls {
  @apply flex h-full gap-x-1;
}
</style>
