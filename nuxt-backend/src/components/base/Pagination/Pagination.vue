<script setup lang="ts">
const { pagination } = defineProps<{ pagination: Meta }>();
</script>

<template>
  <UiPagination
    v-slot="{ page }" :total="pagination.total" :sibling-count="1" :items-per-page="pagination.perPage"
    show-edges class="mt-auto"
  >
    <UiPaginationList v-slot="{ items }" class="flex items-center gap-1">
      <UiPaginationFirst />
      <UiPaginationPrev />

      <template v-for="(item, index) in items">
        <UiPaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
          <UiButton class="w-10 h-10 p-0 dark:text-white" :variant="item.value === page ? 'default' : 'outline'">
            {{ item.value }}
          </UiButton>
        </UiPaginationListItem>
        <UiPaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

      <UiPaginationNext />
      <UiPaginationLast />
    </UiPaginationList>
  </UiPagination>
</template>
