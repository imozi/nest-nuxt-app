<script setup lang="ts">
const { data: menu, refresh } = await useFetchSecure<ResponseData<Menu>>('/menu', { key: 'menu' });
const currentTab = ref<string | undefined>(menu.value?.data[0]?.id);
const isOpenAlertDialog = ref<boolean>(false);
const isOpenEditDialog = ref<boolean>(false);
const currentMenuItem = ref<MenuItem>();

const menuItems = computed(() => menu.value?.data.filter((item) => item.id === currentTab.value)[0]?.children);

const refreshBeforeSaved = () => {
  isOpenEditDialog.value = !isOpenEditDialog.value;
  refresh();
};

const showDeleteDialog = (item: MenuItem) => {
  currentMenuItem.value = item;
  isOpenAlertDialog.value = !isOpenAlertDialog.value;
};

const showEditDialog = (item: MenuItem) => {
  currentMenuItem.value = item;
  isOpenEditDialog.value = !isOpenEditDialog.value;
};
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
        <MenuControls @on:refresh="refresh" />
      </div>
    </div>

    <ClientOnly>
      <UiTabsContent :value="currentTab!" class="menu__content">
        <template v-if="menuItems?.length">
          <List class="menu__items">
            <ListItem v-for="item of menuItems" :key="item.id">
              <UiAccordion type="single" collapsible class="menu__accordion">
                <UiAccordionItem :value="item.id">
                  <UiAccordionTrigger class="menu__accordion-trigger">
                    <p>{{ item.name }}</p>
                    <span>алиас: {{ item.slug }}</span>
                  </UiAccordionTrigger>

                  <UiAccordionContent>
                    <List class="menu__items-list">
                      <ListItem v-if="!item.pages.length" class="menu__items-list__item">
                        <p>Страниц нет</p>
                      </ListItem>
                      <ListItem v-for="page of item.pages" v-else :key="page.id" class="menu__items-list__item">
                        <p>{{ page.name }}</p>
                      </ListItem>
                    </List>
                  </UiAccordionContent>
                </UiAccordionItem>
                <MenuItemDropdown @on:delete="showDeleteDialog(item)" @on:edit="showEditDialog(item)" />
              </UiAccordion>
            </ListItem>
          </List>
        </template>
        <Empty v-else />
      </UiTabsContent>
    </ClientOnly>
    <MenuItemDelete v-model:open="isOpenAlertDialog" v-model:item="currentMenuItem" @on:deleted="refresh" />
    <MenuItemEdit v-model:open="isOpenEditDialog" v-model:item="currentMenuItem" @on:saved="refreshBeforeSaved" />
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

  &__accordion {
    @apply grid grid-cols-[1fr,max-content] gap-x-1;

    &-trigger {
      @apply gap-x-3 text-base;

      &[data-state='open'] {
        @apply bg-zinc-100 text-black dark:bg-zinc-900 dark:text-white;
      }

      & > span {
        @apply border-l pl-2 text-xs;
      }
    }
  }

  &__items {
    @apply flex flex-col gap-y-1;
  }

  &__items-list {
    @apply pl-10 text-muted-foreground;

    &__item {
      @apply relative flex items-center py-1 pl-2 before:absolute before:-left-2 before:h-full before:w-px before:bg-muted after:absolute after:-left-[0.65rem] after:top-1/2 after:h-1.5 after:w-1.5 after:-translate-y-1/2 after:rounded-full after:bg-primary;
    }
  }
}
</style>
