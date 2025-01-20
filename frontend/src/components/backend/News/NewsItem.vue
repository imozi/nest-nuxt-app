<script setup lang="ts">
type NewsItemProps = {
  news: News;
};

const { news } = defineProps<NewsItemProps>();
const formatDate = computed(() => df.format(new Date(news.date)).toString());
</script>

<template>
  <NuxtLink :to="`/dashboard/news/${news.slug}`" class="news-item group">
    <div class="news-item__image">
      <UnLazyImage
        class="block h-full w-full rounded-md object-cover"
        :src="news.image"
        auto-size
        placeholder-src="/public/default/placeholder.svg"
      />
    </div>
    <div class="flex w-full flex-col gap-y-1">
      <div class="news-item__wrapper">
        <div class="news-item__inner">
          <div class="news-item__name">
            <h3>{{ news.title }}</h3>
            <UiTooltipProvider :delay-duration="100">
              <UiTooltip>
                <UiTooltipTrigger as="div" class="news-item__status" :class="news.isPublished ? 'text-green-500' : 'text-red-500'">
                  <Icon v-if="news.isPublished" name="solar:check-square-bold" class="h-full w-full" />
                  <Icon v-else name="solar:close-square-bold" class="h-full w-full" />
                </UiTooltipTrigger>
                <UiTooltipContent side="top">
                  {{ news.isPublished ? 'Опубликованно' : 'Не опубликованно' }}
                </UiTooltipContent>
              </UiTooltip>
            </UiTooltipProvider>
          </div>
          <div class="news-item__slug">
            <p>алиас: {{ news.slug }}</p>
          </div>
        </div>
        <Icon
          name="solar:link-square-outline"
          class="ml-auto size-5 flex-shrink-0 text-muted-foreground transition-all duration-300 group-hover:text-blue-500 dark:group-hover:text-blue-500"
        />
      </div>
      <div class="news-item__bottom">
        <div class="news-item__description" v-html="news.description" />
        <div class="news-item__bottom-wrapper">
          <List class="news-item__tags">
            <ListItem v-for="tag of news.tags" :key="tag.id" class="news-item__tags-item">
              <p># {{ tag.name }}</p>
            </ListItem>
          </List>
          <div class="news-item__date">
            <p>{{ formatDate }}</p>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style lang="scss">
.news-item {
  @apply flex w-full gap-x-3 rounded-md bg-accent bg-zinc-50 px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 dark:bg-zinc-900;

  &__image {
    @apply max-h-20 max-w-20;
  }

  &__status {
    @apply flex size-4 flex-shrink-0;
  }

  &__wrapper {
    @apply flex items-center gap-x-10;
  }

  &__inner {
    @apply flex items-center gap-x-2;
  }

  &__name {
    @apply flex items-center gap-x-2 text-lg;

    & > h3 {
      @apply line-clamp-1;
    }
  }

  &__slug {
    @apply line-clamp-1 max-w-sm flex-shrink-0 border-l pl-2 text-xs text-muted-foreground;
  }

  &__bottom {
    @apply flex flex-col gap-y-2;

    &-wrapper {
      @apply flex items-center gap-x-3;
    }
  }

  &__description {
    @apply text-sm text-muted-foreground;
  }

  &__tags {
    @apply flex gap-x-1 text-xs text-muted-foreground;

    &-item {
      @apply rounded-md bg-primary bg-zinc-100 px-2 py-1 dark:bg-zinc-800;
    }
  }

  &__date {
    @apply ml-auto text-xs text-muted-foreground;
  }
}
</style>
