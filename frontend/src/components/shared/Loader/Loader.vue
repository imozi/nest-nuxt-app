<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';
import { loaderVariants, type LoaderVariants } from '.';

interface Props {
  variant?: LoaderVariants['variant'];
  size?: LoaderVariants['size'];
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
</script>

<template>
  <span class="loader" :class="cn(loaderVariants({ variant, size }), props.class)" />
</template>

<style lang="scss"></style>
