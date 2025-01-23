<script setup lang="ts">
const { params } = useRoute();
const { data: page } = await useFetchSecure<Page>(`pages/${params.slug}`, { key: 'page' });

definePageMeta({
  layout: 'dashboard',
});

useSeoMeta({
  title: `ЕСЭД | ${page.value?.name}`,
});

useBreadcrumbs({
  label: page.value!.name,
  url: `/dashboard/pages/${page.value!.slug}`,
  parent: { slug: '/dashboard/pages', title: 'Страницы' },
});
</script>

<template>
  <PageFormEdit />
</template>
