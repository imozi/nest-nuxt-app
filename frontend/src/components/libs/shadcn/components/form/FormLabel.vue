<script lang="ts" setup>
import type { LabelProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';
import { useFormField } from './useFormField';
import { Label } from '@/components/libs/shadcn/components/label';
import { cn } from '@/components/libs/shadcn/utils';

const props = defineProps<LabelProps & { class?: HTMLAttributes['class'] }>();

const { error, formItemId } = useFormField();
</script>

<template>
  <Label :class="cn(error && 'text-destructive', props.class)" :for="formItemId">
    <slot />
  </Label>
</template>
