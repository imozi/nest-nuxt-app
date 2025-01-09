<script setup lang="ts">
const { data: pages } = await useFetchSecure<ResponseData<Page>>('/pages');
</script>

<template>
  <section v-if="pages" class="pages">
    <div class="pages__wrapper">
      <header class="pages__header">
        <div class="pages__column">
          <Icon name="solar:hashtag-square-linear" class="size-5" />
          <p>Страницы</p>
        </div>
        <div class="pages__column" />
      </header>
      <UiSeparator />
      <div class="pages__content">
        <List class="pages__list">
          <ListItem v-for="item of pages.data" :key="item.id" class="pages__item">
            <PagesItem :page="item" />
          </ListItem>
        </List>
      </div>
    </div>
  </section>

  <Empty v-else />
</template>

<style lang="scss">
.pages {
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
