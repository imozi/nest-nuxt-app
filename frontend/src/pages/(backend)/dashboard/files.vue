<script setup lang="ts">
useSeoMeta({
  title: `ЕСЭД | Файлы`,
});

definePageMeta({
  name: 'Файлы',
  layout: 'dashboard',
});
useBreadcrumbs();
</script>

<template>
  <FilesViewer deleted />
</template>
