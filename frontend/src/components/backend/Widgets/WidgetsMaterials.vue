<script setup lang="ts">
const { data } = useNuxtData<{ material: string }>('statistics');
const { material } = data.value!;
</script>

<template>
  <div class="widgets-materials">
    <div class="widgets-materials__icon">
      <Icon name="solar:document-text-linear" class="size-8" />
    </div>
    <div class="widgets-materials__wrapper">
      <div class="widgets-materials__total">
        <p>{{ material }}</p>
      </div>
      <div class="widgets-materials__name">
        <h3>Размещено материалов</h3>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.widgets-materials {
  @apply flex flex-[1_1_calc(33.333333%_-_1rem)] rounded-md border p-4;

  &__wrapper {
    @apply flex flex-grow flex-col;
  }

  &__name {
    @apply mx-auto mt-auto text-muted-foreground;
  }

  &__total {
    @apply m-auto text-8xl font-semibold;
  }

  &__icon {
    @apply flex h-full w-9 items-center justify-center rounded-md bg-indigo-600 p-1 text-white;
  }
}
</style>
