<script setup lang="ts">
import { DotsHorizontalIcon } from '@radix-icons/vue';
import { PaginationEllipsis, type PaginationEllipsisProps } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';
import { cn } from '@/components/libs/shadcn/utils';

const props = defineProps<PaginationEllipsisProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <PaginationEllipsis v-bind="delegatedProps" :class="cn('flex h-7 w-7 items-center justify-center', props.class)">
    <slot>
      <DotsHorizontalIcon />
    </slot>
  </PaginationEllipsis>
</template>
