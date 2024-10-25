<template>
  <aside class="aside-right">
    <header class="aside-right__header">
      <div class="aside-right__content" />
      <footer class="aside-right__footer" />
    </header>
  </aside>
</template>

<style lang="scss">
.aside-right {
  @apply sticky top-[var(--height-original)] flex h-[calc(100vh_-_var(--height-original))] items-center;

  &__content {
    @apply h-[calc(100%_-var(--height-inner)_*2)] w-full overflow-x-hidden p-5;

    &::-webkit-scrollbar {
      @apply w-0;
    }

    &:empty {
      @apply p-0;
    }
  }

  &__header {
    @apply absolute left-0 top-0 z-50 flex h-[var(--height-inner)] w-full p-2;

    &:empty {
      @apply h-0 p-0;
    }
  }

  &__footer {
    @apply absolute bottom-0 left-0 z-50 h-[var(--height-inner)] w-full p-2;

    &:empty {
      @apply h-0 p-0;
    }
  }
}
</style>
