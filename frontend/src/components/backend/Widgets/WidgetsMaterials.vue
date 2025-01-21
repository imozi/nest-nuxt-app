<script setup lang="ts">
const props = defineProps<{ total: string }>();
</script>

<template>
  <div class="widgets-materials">
    <div class="widgets-materials__icon">
      <Icon name="solar:document-text-linear" class="size-8" />
    </div>
    <div class="widgets-materials__wrapper">
      <div class="widgets-materials__total">
        <p>{{ props.total }}</p>
      </div>
      <div class="widgets-materials__name">
        <h3>Размещено материалов</h3>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.widgets-materials {
  @apply flex gap-x-3 rounded-md border p-4;

  &__wrapper {
    @apply flex flex-col;
  }

  &__name {
    @apply mt-auto text-muted-foreground;
  }

  &__total {
    @apply text-3xl font-semibold;
  }

  &__icon {
    @apply flex h-16 w-16 items-center justify-center rounded-md bg-indigo-600 text-white;
  }
}
</style>
