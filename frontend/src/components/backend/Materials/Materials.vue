<script setup lang="ts">
const { data: materials } = useFetchSecure<ResponseData<Material>>('/materials', { key: 'materials' });
</script>

<template>
  <section v-if="materials" class="materials">
    <div class="materials__wrapper">
      <header class="materials__header">
        <div class="materials__column">
          <Icon name="solar:hashtag-square-linear" class="size-5" />
          <p>Материалы</p>
        </div>
        <div class="materials__column" />
      </header>
      <UiSeparator />
      <div class="materials__content">
        <List class="materials__list">
          <ListItem v-for="item of materials.data" :key="item.id" class="materials__item">
            <MaterialsItem :item="item" />
          </ListItem>
        </List>
      </div>
    </div>
  </section>

  <Empty v-else />
</template>

<style lang="scss">
.materials {
  &__header {
    @apply flex items-center gap-x-5 pb-5;
  }

  &__column {
    @apply flex items-center gap-x-2;

    &:first-child {
      @apply border-r pr-4;
    }
  }

  &__content {
    @apply py-4;
  }

  &__list {
    @apply flex flex-col gap-y-3;
  }

  &__item {
    @apply flex;
  }
}
</style>
