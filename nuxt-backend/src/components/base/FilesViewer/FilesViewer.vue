<script setup lang="ts">
const tabModal = defineModel<string>('tab', { default: 'all' });
const selectedFiles = reactive<number[]>([]);
</script>

<template>
  <UiTabs v-model:model-value="tabModal" class="files-viewer" :default-value="tabModal">
    <div class="files-viewer__wrapper">
      <UiTabsList class="files-viewer__list">
        <UiTabsTrigger value="all"> Все </UiTabsTrigger>
        <UiTabsTrigger value="images"> Изображения </UiTabsTrigger>
      </UiTabsList>
      <div class="files-viewer__collumn">
        <slot name="files-viewer-header" />
      </div>
    </div>

    <UiTabsContent :value="tabModal" class="files-viewer__content">
      <slot name="files-viewer-content" />

      <UiContextMenu>
        <UiContextMenuTrigger as-child>
          <FilesViewerFileList v-model:selected="selectedFiles" />
        </UiContextMenuTrigger>
        <UiContextMenuContent>
          <UiContextMenuItem>Скопировать ссылку</UiContextMenuItem>
          <UiContextMenuItem>Подробнее</UiContextMenuItem>
          <UiContextMenuItem>Удалить</UiContextMenuItem>
        </UiContextMenuContent>
      </UiContextMenu>
    </UiTabsContent>
  </UiTabs>
</template>

<style lang="scss">
.files-viewer {
  @apply flex flex-col gap-y-5;

  &__wrapper {
    @apply flex items-center;
  }
}
</style>
