<script setup lang="ts">
const { params } = useRoute();

async function fetchPageDataFromApi() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ label: 'Динамически', url: '/news/asdasda' }), 1000);
  });
}

const a = await fetchPageDataFromApi();
useBreadcrumbs(a);
</script>

<template>
  <h1>{{ params }}</h1>
</template>
