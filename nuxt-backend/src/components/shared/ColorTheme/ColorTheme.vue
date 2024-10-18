<script setup lang="ts">
const colorMode = useColorMode();

const onClick = () => {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark';
};
</script>

<template>
  <UiButton type="button" variant="outline" size="icon" @click="onClick">
    <Icon name="solar:moon-stars-bold" class="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    <Icon
      name="solar:sun-2-bold-duotone"
      class="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
    />
    <span class="sr-only">Изменить тему</span>
  </UiButton>
</template>
