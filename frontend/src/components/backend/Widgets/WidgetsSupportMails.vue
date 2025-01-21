<script setup lang="ts">
const props = defineProps<{ total: string }>();
</script>

<template>
  <div class="widgets-support-mails">
    <div class="widgets-support-mails__icon">
      <Icon name="solar:inbox-unread-linear" class="size-8" />
    </div>
    <div class="widgets-support-mails__wrapper">
      <div class="widgets-support-mails__total">
        <p>{{ props.total }}</p>
      </div>
      <div class="widgets-support-mails__name">
        <h3>Всего поступило обращений</h3>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.widgets-support-mails {
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
    @apply flex h-16 w-16 items-center justify-center rounded-md bg-teal-600 text-white;
  }
}
</style>
