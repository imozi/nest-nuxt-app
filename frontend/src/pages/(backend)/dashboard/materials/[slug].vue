<script setup lang="ts">
const { params } = useRoute();

const { data: material } = await useFetchSecure<Material>(`/materials/${params.slug}`, { key: 'material' });

definePageMeta({
  layout: 'dashboard',
});

useSeoMeta({
  title: `ЕСЭД | ${material.value?.name}`,
});

useBreadcrumbs({
  label: material.value!.name,
  url: material.value?.slug ? `/dashboard/materials/${material.value!.slug}` : `/dashboard/materials/${material.value!.id}`,
  parent: { slug: '/dashboard/materials', title: 'Материалы' },
});
</script>

<template>
  <MaterialForm mode="edit" :type="material?.slug ? 'material-page' : 'material'" />
</template>
