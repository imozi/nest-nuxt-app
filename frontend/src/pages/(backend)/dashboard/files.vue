<script setup lang="ts">
useSeoMeta({
  title: `ЕСЭД | Файлы`,
});

definePageMeta({
  name: 'Файлы',
});
useBreadcrumbs();
</script>

<template>
  <FilesViewer deleted />
</template>
