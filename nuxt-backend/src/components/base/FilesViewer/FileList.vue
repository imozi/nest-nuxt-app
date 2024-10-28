<script setup lang="ts">
const selected = defineModel<number[]>('selected', { required: true });
</script>

<template>
  <div class="files">
    <List class="files__list">
      <ListItem v-for="item of 15" :key="item" class="files__list-item">
        <FilesViewerFileCard :id="item" v-model:selected="selected" />
      </ListItem>
    </List>
  </div>
</template>

<style lang="scss">
.files {
  @apply flex flex-col gap-y-1;

  &__list {
    @apply flex w-full flex-col gap-y-1;
  }
}
</style>
