<script setup lang="ts">
const selected = defineModel<number[]>('selected', { required: true });
</script>

<template>
  <div class="files">
    <List class="files__list">
      <ListItem v-for="item of 10" :key="item" class="files__list-item">
        <FilesViewerFileCard :id="item" v-model:selected="selected" />
      </ListItem>
    </List>
  </div>
</template>

<style lang="scss">
.files {
  @apply flex;

  &__list {
    @apply flex w-full flex-col;
  }
}
</style>
