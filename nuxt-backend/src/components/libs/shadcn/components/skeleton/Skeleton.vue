<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/components/libs/shadcn/utils';

interface SkeletonProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<SkeletonProps>();
</script>

<template>
  <div :class="cn('animate-pulse rounded-md bg-gray-200 dark:bg-background', props.class)" />
</template>
