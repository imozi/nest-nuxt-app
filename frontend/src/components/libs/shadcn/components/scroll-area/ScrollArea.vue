<script setup lang="ts">
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  type ScrollAreaRootProps,
  ScrollAreaViewport,
} from 'radix-vue';
import { computed, type HTMLAttributes } from 'vue';
import ScrollBar from './ScrollBar.vue';
import { cn } from '@/components/libs/shadcn/utils';

const props = defineProps<ScrollAreaRootProps & { class?: HTMLAttributes['class'] }>();
const viewport = useTemplateRef('viewport');
const emit = defineEmits(['on:scroll-bottom']);

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const onScroll = () => {
  const el = viewport.value?.$el;

  const scrollTop = el.parentNode.scrollTop;
  const scrollHeight = el.parentNode.scrollHeight;
  const clientHeight = el.parentNode.clientHeight;

  if (scrollTop + clientHeight >= scrollHeight) {
    emit('on:scroll-bottom');
  }
};
</script>

<template>
  <ScrollAreaRoot v-bind="delegatedProps" :class="cn('relative overflow-hidden', props.class)">
    <ScrollAreaViewport
      ref="viewport"
      as-child
      class="h-full w-full rounded-[inherit]"
      @scroll="onScroll"
    >
      <slot />
    </ScrollAreaViewport>
    <ScrollBar />
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>
