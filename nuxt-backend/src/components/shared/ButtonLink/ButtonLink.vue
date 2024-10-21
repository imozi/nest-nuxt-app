<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { linkVariants, type LinkVariants } from '.';
import type { NuxtLinkProps } from '#app';

interface Props {
  link?: NuxtLinkProps;
  variant?: LinkVariants['variant'];
  size?: LinkVariants['size'];
  class?: HTMLAttributes['class'];
  active?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'ghost',
});
</script>

<template>
  <NuxtLink v-bind="props.link" :class="cn(linkVariants({ variant, size }), props.class)">
    <slot />
  </NuxtLink>
  <!-- :active-class="props.active ? cn(linkVariants({ variant: 'default', size }), props.class) : ''" -->
</template>
