<script setup lang="ts">
type MaterialItemProps = {
  item: Material;
};

const { item } = defineProps<MaterialItemProps>();
</script>

<template>
  <NuxtLink :to="`/dashboard/materials/${item.slug || item.id}`" class="material-item group">
    <div class="material-item__wrapper">
      <div class="material-item__inner">
        <div class="material-item__name">
          <Icon name="solar:file-text-outline" class="size-5 flex-shrink-0" />
          <h3>{{ item.name }}</h3>
          <UiTooltipProvider :delay-duration="100">
            <UiTooltip>
              <UiTooltipTrigger as="div" class="material-item__status" :class="item.isPublished ? 'text-green-500' : 'text-red-500'">
                <Icon v-if="item.isPublished" name="solar:check-square-bold" class="h-full w-full" />
                <Icon v-else name="solar:close-square-bold" class="h-full w-full" />
              </UiTooltipTrigger>
              <UiTooltipContent side="top">
                {{ item.isPublished ? 'Опубликованно' : 'Не опубликованно' }}
              </UiTooltipContent>
            </UiTooltip>
          </UiTooltipProvider>
        </div>
        <div class="material-item__slug">
          <p>{{ item.slug && `алиас: ${item.slug}` }}</p>
        </div>
      </div>
      <Icon
        name="solar:link-square-outline"
        class="ml-auto size-5 flex-shrink-0 text-muted-foreground transition-all duration-300 group-hover:text-blue-500 dark:group-hover:text-blue-500"
      />
    </div>
    <div class="material-item__bottom">
      <List class="material-item__tags">
        <ListItem v-for="tag of item.tags" :key="tag.id" class="material-item__tags-item">
          <p># {{ tag.name }}</p>
        </ListItem>
      </List>
      <div class="material-item__menu-item">
        <Icon name="solar:link-circle-bold" class="text-blue-500" />
        <p>{{ item.menuItem?.name }} {{ item.page?.name }}</p>
      </div>
    </div>
  </NuxtLink>
</template>

<style lang="scss">
.material-item {
  @apply flex w-full flex-col gap-y-2 rounded-md bg-accent bg-zinc-50 px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 dark:bg-zinc-900;

  &__status {
    @apply flex size-4;
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
    @apply flex items-center gap-x-3;
  }

  &__menu-item {
    @apply flex items-center gap-x-1 text-xs text-muted-foreground;
  }

  &__tags {
    @apply flex gap-x-1 text-xs text-muted-foreground;

    &-item {
      @apply rounded-md bg-primary bg-zinc-100 px-2 py-1 dark:bg-zinc-800;
    }
  }
}
</style>
