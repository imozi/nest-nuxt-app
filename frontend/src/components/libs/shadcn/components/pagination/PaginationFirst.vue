<script setup lang="ts">
import { DoubleArrowLeftIcon } from '@radix-icons/vue';
import { PaginationFirst, type PaginationFirstProps } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';
import { cn } from '@/components/libs/shadcn/utils';
import { Button } from '@/components/libs/shadcn/components/button';

const props = withDefaults(defineProps<PaginationFirstProps & { class?: HTMLAttributes['class'] }>(), {
  asChild: true,
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <PaginationFirst v-bind="delegatedProps">
    <Button :class="cn('h-7 w-7 p-0', props.class)" variant="outline">
      <slot>
        <DoubleArrowLeftIcon />
      </slot>
    </Button>
  </PaginationFirst>
</template>
