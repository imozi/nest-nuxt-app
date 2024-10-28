<script setup lang="tsx">
const placeholder = computed(() => useAssetsPath('public/default/placeholder.svg'));
</script>

<template>
  <UnLazyImage class="block h-full w-full rounded-md object-cover" auto-size :placeholder-src="placeholder" />
</template>
