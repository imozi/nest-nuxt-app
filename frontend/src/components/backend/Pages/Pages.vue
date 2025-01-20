<script setup lang="ts">
import { useFilterPages } from './composables/useFilterPages';

const { data: pages, search } = await useFilterPages();
</script>

<template>
  <section v-if="pages" class="pages">
    <div class="pages__wrapper">
      <header class="pages__header">
        <div class="pages__column">
          <Icon name="solar:hashtag-square-linear" class="size-5" />
          <p>Страницы</p>
        </div>
        <div class="pages__column">
          <div class="relative w-full max-w-sm items-center">
            <UiInput id="search" v-model="search" type="text" placeholder="Поиск..." class="pl-10" />
            <span class="absolute inset-y-0 start-0 flex items-center justify-center px-2">
              <Icon name="lucide:search" class="size-4 text-muted-foreground" />
            </span>
          </div>
        </div>
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
