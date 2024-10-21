<template>
  <main class="main">
    <header class="main__header" />
    <section class="main__content">
      <slot />
    </section>
  </main>
</template>

<style lang="scss">
.main {
  @apply h-[calc(100%_-_var(--height-original))];

  &__header {
    @apply sticky top-[var(--height-original)] z-50 h-[var(--height-inner)] bg-background px-16 py-5;

    &:empty {
      @apply h-0 p-0;
    }
  }

  &__content {
    @apply grid content-baseline gap-10 px-16 py-5;
  }
}
</style>
