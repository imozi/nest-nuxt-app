<script setup lang="ts">
type PagesItemProps = {
  page: Page;
};

const props = defineProps<PagesItemProps>();
</script>

<template>
  <NuxtLink :to="`/dashboard/pages/${props.page.slug}`" class="page group">
    <div class="page__wrapper">
      <div class="page__inner">
        <div class="page__name">
          <Icon name="solar:notes-outline" class="size-5" />
          <h3>{{ props.page.name }}</h3>
        </div>
        <div class="page__slug">
          <p>алиас: {{ props.page.slug }}</p>
        </div>
      </div>
      <Icon
        name="solar:link-square-outline"
        class="ml-auto size-5 text-muted-foreground transition-all duration-300 group-hover:text-black dark:group-hover:text-white"
      />
    </div>
    <div class="page__menu-item">
      <p># {{ props.page.menuItem.name }}</p>
    </div>
  </NuxtLink>
</template>

<style lang="scss">
.page {
  @apply w-full rounded-md bg-accent bg-zinc-50 px-4 py-2 transition-all duration-300 hover:-translate-y-0.5 dark:bg-zinc-900;

  &__wrapper {
    @apply flex items-center;
  }

  &__inner {
    @apply flex items-center gap-x-2;
  }

  &__name {
    @apply flex items-center gap-x-3 text-lg;
  }

  &__slug {
    @apply border-l pl-2 text-xs text-muted-foreground;
  }

  &__menu-item {
    @apply text-xs text-muted-foreground;
  }
}
</style>
