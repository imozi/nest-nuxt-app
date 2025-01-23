<script setup lang="ts">
useSeoMeta({
  title: `ЕСЭД | Главная`,
});

definePageMeta({
  name: 'Главная',
  layout: 'dashboard',
});

useBreadcrumbs();
</script>

<template>
  <Widgets />
  <Announcements />
</template>
