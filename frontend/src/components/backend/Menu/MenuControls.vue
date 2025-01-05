<script setup lang="ts">
const { isIncludeRole } = useAccountStore();
</script>

<template>
  <div class="menu__controls">
    <MenuItemCreate />
    <MenuCreate v-if="isIncludeRole('admin')" />
  </div>
</template>

<style lang="scss">
.menu__controls {
  @apply flex items-center gap-x-2;
}
</style>
