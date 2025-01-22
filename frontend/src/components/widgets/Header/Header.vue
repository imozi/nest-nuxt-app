<script setup lang="ts">
const { isIncludeRole } = useAccountStore();
</script>

<template>
  <header class="header">
    <div class="header__wrapper container-fhd">
      <LogoText />
      <ColorTheme class="ml-auto" />
      <SignOutAll v-if="isIncludeRole('admin')" />
    </div>
  </header>
</template>

<style lang="scss">
.header {
  @apply sticky top-0 z-50 h-[var(--height-original)] bg-background after:absolute after:bottom-0 after:h-px after:w-full after:bg-gradient-to-r after:from-black/0 after:via-gray-300 after:to-black/0 after:dark:via-gray-700;

  &__wrapper {
    @apply flex items-center gap-x-2 p-5;
  }
}
</style>
