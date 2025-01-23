<script setup lang="ts">
useSeoMeta({
  title: `ЕСЭД | Страницы`,
});

definePageMeta({
  name: 'Страницы',
  layout: 'dashboard',
});

useBreadcrumbs();
</script>

<template>
  <Pages />
</template>
