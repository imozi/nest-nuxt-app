<script setup lang="ts">
import { useFilterNews } from './composables/useFilterNews';

const { data: news, search } = await useFilterNews();
</script>

<template>
  <section v-if="news" class="news">
    <div class="news__wrapper">
      <header class="news__header">
        <div class="news__column">
          <Icon name="solar:hashtag-square-linear" class="size-5" />
          <p>Новости</p>
        </div>
        <div class="news__column">
          <div class="relative w-full max-w-sm items-center">
            <UiInput id="search" v-model="search" type="text" placeholder="Поиск..." class="pl-10" />
            <span class="absolute inset-y-0 start-0 flex items-center justify-center px-2">
              <Icon name="lucide:search" class="size-4 text-muted-foreground" />
            </span>
          </div>
        </div>
      </header>
      <UiSeparator />
      <div class="news__content">
        <List class="news__list">
          <ListItem v-for="item of news.data" :key="item.id" class="news__item">
            <NewsItem :news="item" />
          </ListItem>
        </List>
      </div>
    </div>
  </section>

  <Empty v-else />
</template>

<style lang="scss">
.news {
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
