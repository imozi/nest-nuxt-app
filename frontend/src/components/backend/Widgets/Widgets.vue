<script setup lang="ts">
await useAsyncData('statistics', async () => {
  const [session, material, mail] = await Promise.all([
    $fetchSecure<AccountSessionData>('/sessions/me'),
    $fetchSecure<string>('/materials/total'),
    $fetchSecure<string>('/support-mail/total'),
  ]);

  return { session, material, mail };
});
</script>

<template>
  <section class="widgets">
    <div class="widgets__wrapper">
      <header class="widgets__header">
        <div class="widgets__column">
          <Icon name="solar:hashtag-square-linear" class="size-5" />
          <p>Статистика</p>
        </div>
        <div class="materials__column" />
      </header>
      <UiSeparator />
      <div class="widgets__content">
        <WidgetsSessions />
        <WidgetsMaterials />
        <WidgetsSupportMails />
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.widgets {
  &__header {
    @apply flex items-center gap-x-5 pb-5;
  }

  &__column {
    @apply flex items-center gap-x-2;

    &:first-child {
      @apply border-r pr-4;
    }
  }

  &__content {
    @apply grid grid-flow-col gap-4 py-4;
  }

  &__list {
    @apply flex flex-col gap-y-3;
  }

  &__item {
    @apply flex;
  }
}
</style>
