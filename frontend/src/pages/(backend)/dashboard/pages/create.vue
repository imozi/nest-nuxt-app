<script setup lang="ts">
useSeoMeta({
  title: `ЕСЭД | Создать страницу`,
});
definePageMeta({
  name: 'Создать страницу',
  layout: 'dashboard',
});
useBreadcrumbs();
</script>

<template>
  <PageFormCreate />
</template>
