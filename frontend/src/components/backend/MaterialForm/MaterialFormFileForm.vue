<script setup lang="ts">
type MaterialChoicedFile = {
  url: string;
  name: string;
  type: string;
  originalName: string;
  extention: string;
  size: string;
  text?: string;
  description?: string;
};

const file = defineModel<MaterialChoicedFile>('file', { required: true });
</script>

<template>
  <div>
    <UiInput v-model:model-value="file.originalName" type="text" />
  </div>
</template>
