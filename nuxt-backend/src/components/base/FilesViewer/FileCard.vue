<script setup lang="ts">
const props = defineProps<{ id: number }>();
const selected = defineModel<number[]>('selected', { required: true });

const isSelected = computed(() => selected.value.includes(props.id));

const onSelectFile = (event: MouseEvent) => {
  if (event.ctrlKey && selected.value.includes(props.id)) {
    return;
  }

  if (event.ctrlKey && !selected.value.includes(props.id)) {
    return selected.value.push(props.id);
  }

  if (selected.value.includes(props.id) && selected.value.length <= 1 && event.button !== 2) {
    return (selected.value.length = 0);
  }

  selected.value.length = 0;
  selected.value.push(props.id);
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
        <FilesViewerFileIcon ext="pdf" />
        <!-- <FilesViewerFileImage src="/" /> -->
      </div>
      <div class="file-card__title">
        <h3>photo_2024_03_28_13_54_35.jpg</h3>
      </div>
      <div class="file-card__description">
        <p>8 МБ</p>
        <p>01.10.2024</p>
        <p>17:32</p>
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
