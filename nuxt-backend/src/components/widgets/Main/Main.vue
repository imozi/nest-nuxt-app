<script setup lang="ts"></script>

<template>
  <main class="main">
    <header class="main__header">
      <div class="main__header-wrapper">
        <div class="main__header-inner">
          <div class="border-r pr-3">
            <MainNavMenuTrigger />
          </div>
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
    @apply sticky top-[var(--height-original)] z-50 h-[var(--height-inner)] bg-background px-8;

    &:empty {
      @apply h-0 p-0;
    }

    &-wrapper {
      @apply h-full pt-3;
    }

    &-inner {
      @apply flex h-full items-center gap-x-5 rounded-md bg-zinc-50 px-5 dark:bg-zinc-900;
    }
  }

  &__content {
    @apply grid content-baseline gap-10 px-16 py-5;
  }
}
</style>
