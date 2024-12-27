<script setup lang="ts">
import { buttonVariants } from '@/components/libs/shadcn/components/button'
import { cn } from '@/components/libs/shadcn/utils'
import { AlertDialogAction, type AlertDialogActionProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<AlertDialogActionProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <AlertDialogAction v-bind="delegatedProps" :class="cn(buttonVariants(), props.class)">
    <slot />
  </AlertDialogAction>
</template>
