<script setup lang="ts">
useSeoMeta({
  title: `ЕСЭД | Главная`,
});
definePageMeta({
  name: 'Главная',
});

useBreadcrumbs();
</script>

<template>
  <Widgets />
  <Announcements />
</template>
