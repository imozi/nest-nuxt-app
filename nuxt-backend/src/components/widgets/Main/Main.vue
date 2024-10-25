<template>
  <main class="main">
    <header class="main__header">
      <div class="h-full pt-3">
        <div class="relative flex h-full items-center rounded-md bg-zinc-50 px-5 dark:bg-zinc-900">
          <MainNavMenuTrigger class="absolute -left-11 top-1/2 -translate-y-1/2" />
          <Breadcrumb />
        </div>
      </div>
    </header>
    <section class="main__content">
      <slot />
    </section>
  </main>
</template>

<style lang="scss">
.main {
  @apply h-[calc(100%_-_var(--height-inner))];

  &__header {
    @apply sticky top-[var(--height-original)] z-50 h-[var(--height-inner)] bg-background px-14;

    &:empty {
      @apply h-0 p-0;
    }
  }

  &__content {
    @apply grid content-baseline gap-10 px-16 py-5;
  }
}
</style>
