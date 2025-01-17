<script setup lang="ts">
const { breadcrumbs } = useBreadcrumbsStore();
</script>

<template>
  <ClientOnly>
    <UiBreadcrumb v-if="breadcrumbs">
      <UiBreadcrumbList>
        <template v-for="(breadcrumb, i) of breadcrumbs" :key="breadcrumb.url">
          <UiBreadcrumbItem v-if="i === 0">
            <UiBreadcrumbLink as-child>
              <NuxtLink to="/dashboard/home">
                <Icon name="solar:home-2-linear" class="size-4" />
              </NuxtLink>
            </UiBreadcrumbLink>
          </UiBreadcrumbItem>

          <UiBreadcrumbItem v-else>
            <UiBreadcrumbLink as-child>
              <NuxtLink>
                <NuxtLink :to="i !== breadcrumbs.length - 1 ? breadcrumb.url : ''" class="line-clamp-1 max-w-sm">
                  {{ breadcrumb.label }}
                </NuxtLink>
              </NuxtLink>
            </UiBreadcrumbLink>
          </UiBreadcrumbItem>

          <UiBreadcrumbSeparator v-if="i !== breadcrumbs.length - 1" />
        </template>
      </UiBreadcrumbList>
    </UiBreadcrumb>
  </ClientOnly>
</template>
