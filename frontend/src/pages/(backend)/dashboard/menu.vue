<script setup lang="ts">
useSeoMeta({
  title: `ЕСЭД | Меню`,
});
definePageMeta({
  name: 'Меню',
  layout: 'dashboard',
});
useBreadcrumbs();
</script>

<template>
  <Menu />
</template>
