<script setup lang="ts">
const { data: news } = await useFetchSecure<ResponseData<News>>('/news');
</script>

<template>
  <section v-if="news" class="news">
    <div class="news__wrapper">
      <header class="news__header">
        <div class="news__column">
          <Icon name="solar:hashtag-square-linear" class="size-5" />
          <p>Материалы</p>
        </div>
        <div class="materials__column" />
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
