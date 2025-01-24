<script setup lang="ts">
await useAsyncData('statistics', async () => {
  const [session, material, mail, mailYear] = await Promise.all([
    $fetchSecure<AccountSessionData>('/sessions/me'),
    $fetchSecure<string>('/materials/total'),
    $fetchSecure<string>('/support-mail/total'),
    $fetchSecure<{ month: string; count: number }[]>('/support-mail/total-year'),
  ]);

  return { session, material, mail, mailYear };
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
        <!-- <WidgetsMaterials /> -->
        <WidgetsSupportMails />
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.widgets {
  &__header {
    @apply mt-1.5 flex items-center gap-x-5 pb-6;
  }

  &__column {
    @apply flex items-center gap-x-2;
  }

  &__content {
    @apply flex flex-wrap gap-4 py-4;
  }

  &__list {
    @apply flex flex-col gap-y-3;
  }

  &__item {
    @apply flex;
  }
}
</style>
