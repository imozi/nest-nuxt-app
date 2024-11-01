<script setup lang="ts">
import { DoubleArrowRightIcon } from '@radix-icons/vue';
import { PaginationLast, type PaginationLastProps } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';
import { cn } from '@/components/libs/shadcn/utils';
import { Button } from '@/components/libs/shadcn/components/button';

const props = withDefaults(defineProps<PaginationLastProps & { class?: HTMLAttributes['class'] }>(), {
  asChild: true,
});

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <PaginationLast v-bind="delegatedProps">
    <Button :class="cn('h-7 w-7 p-0', props.class)" variant="outline">
      <slot>
        <DoubleArrowRightIcon />
      </slot>
    </Button>
  </PaginationLast>
</template>
