<script setup lang="ts">
import { useFilterMaterials } from './composables/useFilterMaterials';

const { data: materials, search } = await useFilterMaterials();
</script>

<template>
  <section v-if="materials" class="materials">
    <div class="materials__wrapper">
      <header class="materials__header">
        <div class="materials__column">
          <Icon name="solar:hashtag-square-linear" class="size-5" />
          <p>Материалы</p>
        </div>
        <div class="materials__column">
          <div class="relative w-full max-w-sm items-center">
            <UiInput id="search" v-model="search" type="text" placeholder="Поиск..." class="pl-10" />
            <span class="absolute inset-y-0 start-0 flex items-center justify-center px-2">
              <Icon name="lucide:search" class="size-4 text-muted-foreground" />
            </span>
          </div>
        </div>
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
