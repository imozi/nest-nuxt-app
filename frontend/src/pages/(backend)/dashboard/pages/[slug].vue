<script setup lang="ts">
const { params } = useRoute();
const { data: page } = await useFetchSecure<Page>(`pages/${params.slug}`);

useSeoMeta({
  title: `ЕСЭД | ${page.value?.name}`,
});
// definePageMeta({
//   name: page.value.name,
// });
// useBreadcrumbs({ label: page.value?.name });
</script>

<template>
  <h1>{{ page }}</h1>
</template>
