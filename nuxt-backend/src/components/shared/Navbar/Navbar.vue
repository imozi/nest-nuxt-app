<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { Primitive, type PrimitiveProps } from 'radix-vue';

interface Props extends PrimitiveProps {
  class?: HTMLAttributes['class'];
}

const props = withDefaults(defineProps<Props>(), {
  as: 'nav',
});

const classList = computed(() => {
  return props.class ? props.class.split(' ')[0] + '__list' : '';
});
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cn('', props.class)">
    <List :class="classList">
      <slot />
    </List>
  </Primitive>
</template>
