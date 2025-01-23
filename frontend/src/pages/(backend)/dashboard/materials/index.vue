<script setup lang="ts">
useSeoMeta({
  title: `ЕСЭД | Материал`,
});
definePageMeta({
  name: 'Материалы',
  layout: 'dashboard',
});

useBreadcrumbs();
</script>

<template>
  <Materials />
</template>
