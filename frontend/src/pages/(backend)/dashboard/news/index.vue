<script setup lang="ts">
useSeoMeta({
  title: `ЕСЭД | Новости`,
});

definePageMeta({
  name: 'Новости',
  layout: 'dashboard',
});
useBreadcrumbs();
</script>

<template>
  <News />
</template>
