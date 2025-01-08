<script setup lang="ts">
const { isIncludeRole } = useAccountStore();
const emit = defineEmits(['on:refresh']);
</script>

<template>
  <div class="menu__controls">
    <div class="menu__controls-row">
      <MenuItemCreate @on:created="emit('on:refresh')" />
    </div>
    <div class="menu__controls-row">
      <MenuCreate v-if="isIncludeRole('admin')" @on:created="emit('on:refresh')" />
      <MenuDelete v-if="isIncludeRole('admin')" @on:deleted="emit('on:refresh')" />
    </div>
  </div>
</template>

<style lang="scss">
.menu__controls {
  @apply flex items-center gap-x-2;

  &-row {
    @apply flex items-center gap-x-2 border-r pr-2;

    &:last-child {
      @apply border-none pr-0;
    }
  }
}
</style>
