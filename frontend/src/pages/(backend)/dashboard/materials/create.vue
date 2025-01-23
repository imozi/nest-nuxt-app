<script setup lang="ts">
useSeoMeta({
  title: `ЕСЭД | Создать материал`,
});
definePageMeta({
  name: 'Создать материал',
  layout: 'dashboard',
});

useBreadcrumbs();
</script>

<template>
  <MaterialForm />
</template>
