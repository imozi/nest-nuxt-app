<script setup lang="ts">
const { menu } = useMenuStore();
</script>

<template>
  <aside class="aside-left">
    <header v-auto-animate="{ duration: 100 }" class="aside-left__header">
      <UserAvatar />
    </header>
    <div v-auto-animate="{ duration: 100 }" class="aside-left__content">
      <MainNav />
    </div>
    <footer class="aside-left__footer" :class="{ collapsed: menu.collapsed }">
      <!-- <UiButton variant="ghost" size="icon">
        <Icon name="solar:settings-linear" class="size-5" />
      </UiButton> -->
      <SignOut />
    </footer>
  </aside>
</template>

<style lang="scss">
.aside-left {
  @apply sticky top-[var(--height-original)] flex h-[calc(100vh_-_var(--height-original))] items-center after:absolute after:right-0 after:h-full after:w-px after:bg-gradient-to-t after:from-black/0 after:via-gray-300 after:to-black/0 after:dark:via-gray-700;

  &__content {
    @apply h-[calc(100%_-var(--height-inner)_*2)] w-full overflow-x-hidden px-5 py-2;

    &::-webkit-scrollbar {
      @apply w-0;
    }

    &:empty {
      @apply p-0;
    }
  }

  &__header {
    @apply absolute left-0 top-0 z-50 flex h-[var(--height-inner)] w-full items-center px-5 py-2 after:absolute after:bottom-0 after:h-px after:w-full after:bg-gradient-to-r after:from-black/0 after:via-gray-300 after:to-black/0 after:dark:via-gray-700;

    &:empty {
      @apply h-0 p-0;
    }
  }

  &__footer {
    @apply absolute bottom-0 left-0 z-50 flex h-[var(--height-inner)] w-full items-center justify-start gap-x-2 px-5 py-2;

    &.collapsed {
      @apply gap-y-2;
    }

    &:empty {
      @apply h-0 p-0;
    }
  }
}
</style>
