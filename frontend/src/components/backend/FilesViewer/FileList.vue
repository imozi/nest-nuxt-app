<script setup lang="ts">
type FileListProps = {
  files: FileApi[];
  loading: boolean;
};

const { files, loading } = defineProps<FileListProps>();

const selected = defineModel<FileApi[]>('selected', { required: true });
</script>

<template>
  <div class="files">
    <List class="files__list">
      <ListItem v-for="file of files" :key="file.id" class="files__list-item">
        <FilesViewerFileCard v-model:selected="selected" :file="file" :loading="loading" />
      </ListItem>
    </List>
  </div>
</template>

<style lang="scss">
.files {
  @apply flex flex-col gap-y-1;

  &__list {
    @apply flex w-full flex-col gap-y-1;
  }
}
</style>
