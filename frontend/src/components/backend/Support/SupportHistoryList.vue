<script setup lang="ts">
const props = defineProps<{ id: string }>();
const { data: history, status } = await useFetchSecure<ResponseData<SupportMail>>('/support-mail/history', {
  query: { id: props.id },
  lazy: true,
});
</script>

<template>
  <section class="pages">
    <div class="pages__wrapper">
      <header class="pages__header">
        <div class="pages__column">
          <Icon name="solar:hashtag-square-linear" class="size-5" />
          <p>Обращения</p>
        </div>
        <div class="pages__column">
          <div class="relative w-full max-w-sm items-center">
            <UiInput id="search" type="text" placeholder="Поиск..." class="pl-10" />
            <span class="absolute inset-y-0 start-0 flex items-center justify-center px-2">
              <Icon name="lucide:search" class="size-4 text-muted-foreground" />
            </span>
          </div>
        </div>
      </header>
      <UiSeparator />
      <div class="pages__content">
        <Loader v-if="status === 'pending'" variant="primary" size="xl" class="m-auto" />
        <Empty v-else-if="!history?.data.length" />
        <div v-else class="flex flex-col justify-between">
          <p>{{ history }}</p>
        </div>
        <!--
        <List v-if="pages.data.length" class="pages__list">
          <ListItem v-for="item of pages.data" :key="item.id" class="pages__item">
            <PagesItem :page="item" />
          </ListItem>
        </List>

        <Empty v-else /> -->
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.pages {
  @apply relative grid gap-4 overflow-y-auto px-6 py-4;

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
    @apply py-4;
  }

  &__list {
    @apply flex flex-col gap-y-3;
  }

  &__item {
    @apply flex;
  }
}
</style>
