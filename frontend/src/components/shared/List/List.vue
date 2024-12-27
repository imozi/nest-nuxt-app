<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { Primitive, type PrimitiveProps } from 'radix-vue';
import { listVariants, type ListVariants } from '.';

interface Props extends PrimitiveProps {
  variant?: ListVariants['variant'];
  class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<Props>(), {
  as: 'ul',
});
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cn(listVariants({ variant }), props.class)">
    <slot />
  </Primitive>
</template>
