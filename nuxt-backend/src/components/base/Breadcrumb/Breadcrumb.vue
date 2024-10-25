<script setup lang="ts">
import type { BreadcrumbProps } from '.';

const { breadcrumbs, setDynamicCrumb } = useBreadcrumbs();

const { crumb } = defineProps<BreadcrumbProps>();

if (crumb) {
  setDynamicCrumb(crumb);
}
</script>

<template>
  <UiBreadcrumb>
    <UiBreadcrumbList>
      <template v-for="(breadcrumb, i) of breadcrumbs" :key="breadcrumb.url">
        <UiBreadcrumbItem>
          <UiBreadcrumbLink as-child>
            <NuxtLink :to="breadcrumb.url">{{ breadcrumb.label }} </NuxtLink>
          </UiBreadcrumbLink>
        </UiBreadcrumbItem>
        <UiBreadcrumbSeparator v-if="i !== breadcrumbs.length" />
      </template>
    </UiBreadcrumbList>
  </UiBreadcrumb>
</template>
