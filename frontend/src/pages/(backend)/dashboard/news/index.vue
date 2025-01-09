<script setup lang="ts">
useSeoMeta({
  title: `ЕСЭД | Новости`,
});

definePageMeta({
  name: 'Новости',
});
useBreadcrumbs();

const { data: response } = await useFetchSecure<ResponseData<News>>('/news');
</script>

<template>
  <!-- <h1>News</h1>
  <NuxtLink :to="{ path: '/news/asdasda' }">asdasda</NuxtLink> -->
  <Empty v-if="!response?.data" />
  <p>{{ response?.data }}</p>
</template>
