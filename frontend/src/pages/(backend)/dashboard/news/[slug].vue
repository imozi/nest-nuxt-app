<script setup lang="ts">
const { params } = useRoute();

const { data: news } = await useFetchSecure<News>(`/news/${params.slug}`, { key: 'news-single' });

definePageMeta({
  layout: 'dashboard',
});

useSeoMeta({
  title: `ЕСЭД | ${news.value?.title}`,
});

useBreadcrumbs({
  label: news.value!.title,
  url: `/dashboard/news/${news.value?.slug}`,
  parent: { slug: '/dashboard/news', title: 'Новости' },
});
</script>

<template>
  <NewsFormEdit />
</template>
