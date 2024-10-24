<script setup lang="ts">
import { AccordionHeader, AccordionTrigger, type AccordionTriggerProps } from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';
import { cn } from '@/components/libs/shadcn/utils';

const props = defineProps<AccordionTriggerProps & { class?: HTMLAttributes['class'] }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <AccordionHeader class="flex" as="div">
    <AccordionTrigger
      v-bind="delegatedProps"
      :class="
        cn(
          'inline-flex h-9 w-full flex-1 items-center whitespace-nowrap rounded-xl px-4 py-2 text-sm text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180',
          props.class,
        )
      "
    >
      <slot />
      <slot name="icon">
        <Icon
          name="solar:alt-arrow-down-linear"
          class="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
        />
      </slot>
    </AccordionTrigger>
  </AccordionHeader>
</template>
