<script setup lang="ts">
const { data: menu } = await useFetchSecure<ResponeData<Menu>>('/menu');
const currentTab = ref<string | undefined>(menu.value?.data[0]?.id);

const menuItems = computed(() => menu.value?.data.filter((item) => item.id === currentTab.value)[0]?.children);
</script>

<template>
  <UiTabs v-if="menu?.data" v-model:model-value="currentTab" class="menu" :default-value="currentTab">
    <div class="menu__wrapper">
      <div class="menu__title">
        <Icon name="solar:hashtag-square-linear" class="size-5" />
        <p>Меню</p>
      </div>
      <ClientOnly>
        <UiTabsList class="menu__list">
          <UiTabsTrigger v-for="tab of menu?.data" :key="tab.id" :value="tab.id">
            {{ tab.name }}
          </UiTabsTrigger>
        </UiTabsList>
      </ClientOnly>
      <div class="menu__collumn">
        <MenuControls />
      </div>
    </div>

    <ClientOnly>
      <UiTabsContent :value="currentTab!" class="menu__content">
        <template v-if="menuItems?.length">
          <List>
            <ListItem v-for="item of menuItems" :key="item.id">
              {{ item.name }}
            </ListItem>
          </List>
        </template>
        <Empty v-else />
      </UiTabsContent>
    </ClientOnly>
  </UiTabs>

  <Empty v-else />
</template>

<style lang="scss">
.menu {
  @apply flex flex-col gap-y-5;

  &__wrapper {
    @apply flex items-center gap-x-5 border-b pb-5;
  }

  &__title {
    @apply flex items-center gap-x-2 border-r pr-4;
  }

  &__collumn {
    @apply ml-auto flex h-full gap-x-3;
  }
}
</style>
