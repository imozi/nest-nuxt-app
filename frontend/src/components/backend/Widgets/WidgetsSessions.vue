<script setup lang="ts">
const { data } = useNuxtData<{ session: AccountSessionData }>('statistics');
const { session } = data.value!;
</script>

<template>
  <div class="widgets-sessions">
    <div class="widgets-sessions__icon">
      <Icon name="solar:shield-user-bold" class="size-8" />
    </div>
    <div class="widgets-sessions__wrapper">
      <div class="widgets-sessions__total">
        <p>{{ session?.list.length }}</p>
        <div class="widgets-sessions__info" />
      </div>
      <div class="widgets-sessions__name">
        <h3>Активные сессии</h3>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.widgets-sessions {
  @apply flex flex-[1_1_calc(33.333333%_-_1rem)] rounded-md border p-4;

  &__wrapper {
    @apply flex flex-grow flex-col;
  }

  &__name {
    @apply mx-auto mt-auto text-muted-foreground;
  }

  &__total {
    @apply m-auto flex items-center gap-x-3 text-8xl font-semibold;
  }

  &__icon {
    @apply flex h-full w-9 items-center justify-center rounded-md bg-blue-600 p-1 text-white;
  }
}
</style>
