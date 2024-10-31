<script setup lang="ts">
import { DateFormatter } from '@internationalized/date';

const { file } = defineProps<{ file: FileApi }>();
const selected = defineModel<FileApi[]>('selected', { required: true });

const isSelected = computed(() => selected.value.find((item) => item.id === file.id));
const formatDate = new DateFormatter('ru-Ru', {
  dateStyle: 'short',
});
const formatTime = new DateFormatter('ru-Ru', {
  timeStyle: 'short',
});

const onSelectFile = (event: MouseEvent) => {
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
        <FilesViewerFileIcon v-if="file.type !== 'images'" :ext="file.extention" />
        <FilesViewerFileImage v-else :src="file.url" />
      </div>
      <div class="file-card__title">
        <h3>{{ file.name }}</h3>
      </div>
      <div class="file-card__description">
        <p>{{ file.size }}</p>
        <p>{{ formatDate.format(new Date(file.createdAt)) }}</p>
        <p>{{ formatTime.format(new Date(file.createdAt)) }}</p>
      </div>
    </div>
  </UiButton>
</template>

<style lang="scss">
.file-card {
  @apply h-full justify-stretch;

  &--selected {
    @apply bg-muted text-accent-foreground;
  }

  &__wrapper {
    @apply grid w-full grid-cols-[max-content,1fr,1fr] gap-x-5;
  }

  &__preview {
    @apply flex size-8 items-center justify-center;
  }

  &__title {
    @apply flex items-center justify-start;
  }

  &__description {
    @apply flex items-center justify-end gap-x-14;
  }
}
</style>
