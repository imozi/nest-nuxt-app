<script setup lang="ts">
import { DateFormatter } from '@internationalized/date';

type FileCardProps = {
  file: FileApi;
  loading: boolean;
};

const { file, loading } = defineProps<FileCardProps>();
const selected = defineModel<FileApi[]>('selected', { required: true });

const isSelected = computed(() => selected.value.find((item) => item.id === file.id));
const formatDate = new DateFormatter('ru-Ru', {
  dateStyle: 'short',
});
const formatTime = new DateFormatter('ru-Ru', {
  timeStyle: 'short',
});

const onSelectFile = (event: MouseEvent) => {
  if (loading) return;

  const isKeys = event.ctrlKey || event.metaKey;

  if (isKeys && isSelected.value) {
    return;
  }

  if (isKeys && !isSelected.value) {
    return selected.value.push(file);
  }

  if (isSelected.value && selected.value.length <= 1 && event.button !== 2) {
    return (selected.value.length = 0);
  }

  selected.value.length = 0;
  selected.value.push(file);
};
</script>

<template>
  <UiButton
    type="button"
    variant="ghost"
    class="file-card"
    :class="{ 'file-card--selected': isSelected }"
    @click="onSelectFile"
    @click.right="onSelectFile"
  >
    <div class="file-card__wrapper">
      <div class="file-card__preview">
        <template v-if="loading">
          <UiSkeleton class="h-full w-full" />
        </template>
        <template v-else>
          <FilesViewerFileIcon v-if="file.type !== 'images'" :ext="file.extention" />
          <FilesViewerFileImage v-else :src="useAssetsPath(file.url)" />
        </template>
      </div>
      <div class="file-card__title">
        <UiSkeleton v-if="loading" class="h-4 w-full" />
        <h3 v-else>{{ file.name }}</h3>
      </div>
      <div class="file-card__description">
        <template v-if="loading">
          <UiSkeleton v-if="loading" class="h-4 w-16" />
          <UiSkeleton v-if="loading" class="h-4 w-16" />
          <UiSkeleton v-if="loading" class="h-4 w-16" />
        </template>

        <template v-else>
          <p>{{ file.size }}</p>
          <p>{{ formatDate.format(new Date(file.createdAt)) }}</p>
          <p>{{ formatTime.format(new Date(file.createdAt)) }}</p>
        </template>
      </div>
    </div>
  </UiButton>
</template>

<style lang="scss">
.file-card {
  @apply h-full justify-stretch;

  &--selected {
    @apply bg-zinc-200 text-accent-foreground dark:bg-zinc-900;
  }

  &__wrapper {
    @apply grid w-full grid-cols-[max-content,1fr,1fr] gap-x-5;
  }

  &__preview {
    @apply flex size-8 items-center justify-center;
  }

  &__title {
    @apply line-clamp-1 flex items-center justify-start;
  }

  &__description {
    @apply flex items-center justify-end gap-x-14;
  }
}
</style>
