<script setup lang="ts">
useSeoMeta({
  title: `ЕСЭД | Создать новость`,
});
definePageMeta({
  name: 'Создать новость',
  layout: 'dashboard',
});
useBreadcrumbs();
</script>

<template>
  <NewsForm />
</template>
