<script setup lang="ts">
const { data: materials } = useFetchSecure('/materials', { key: 'materials' });
</script>

<template>
  <section v-if="materials" class="materials">
    <p>{{ materials.data }}</p>
  </section>

  <Empty v-else />
</template>
