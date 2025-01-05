<script setup lang="tsx">
const { data: tags, refresh } = await useFetchSecure<ResponeData<Tags>>('/tags');
const isOpenAlertDialog = ref<boolean>(false);
const isOpenEditDialog = ref<boolean>(false);
const isOpenCreateDialog = ref<boolean>(false);
const isOpenTooltip = ref<boolean>(false);
const currentTag = ref<Tags>();

const refreshBeforeSaved = () => {
  isOpenEditDialog.value = !isOpenEditDialog.value;
  refresh();
};

const refreshBeforeCreate = () => {
  isOpenCreateDialog.value = !isOpenCreateDialog.value;
  refresh();
};

const refreshBeforeDeleted = () => {
  refresh();
};

const showCreateDialog = (evt: MouseEvent & { target: HTMLButtonElement }) => {
  isOpenCreateDialog.value = !isOpenCreateDialog.value;
  evt.target?.blur();
};

const showEditDialog = (tag: Tags) => {
  currentTag.value = tag;
  isOpenEditDialog.value = !isOpenEditDialog.value;
};

const showDeleteDialog = (tag: Tags) => {
  currentTag.value = tag;
  isOpenAlertDialog.value = !isOpenAlertDialog.value;
};

const onMouseover = () => {
  isOpenTooltip.value = true;
};

const onMouseleave = () => {
  isOpenTooltip.value = false;
};
</script>

<template>
  <section v-if="tags" class="tags">
    <div class="tags__wrapper">
      <header class="tags__header">
        <div class="tags__column">
          <Icon name="solar:hashtag-square-linear" class="size-5" />
          <p>Теги</p>
        </div>
        <div class="tags__column">
          <UiTooltipProvider :delay-duration="100">
            <UiTooltip :open="isOpenTooltip">
              <UiTooltipTrigger as-child>
                <UiButton variant="secondary" size="icon" @click="showCreateDialog" @mouseover="onMouseover" @mouseleave="onMouseleave">
                  <Icon name="solar:add-square-outline" class="size-5" />
                </UiButton>
              </UiTooltipTrigger>
              <UiTooltipContent side="top">
                <p>Создать</p>
              </UiTooltipContent>
            </UiTooltip>
          </UiTooltipProvider>
        </div>
      </header>
      <UiSeparator />
      <div class="tags__content">
        <List class="tags__list">
          <ListItem v-for="tag of tags?.data" :key="tag.id" class="tags__item">
            <div class="tags__item-wrapper">
              <Icon name="solar:hashtag-square-linear" class="size-4" />
              <p>{{ tag.name }}</p>
            </div>
            <ClientOnly>
              <TagsDropdown @on:delete="showDeleteDialog(tag)" @on:edit="showEditDialog(tag)" />
            </ClientOnly>
          </ListItem>
        </List>
      </div>
    </div>
    <TagsCreate v-model:open="isOpenCreateDialog" @on:created="refreshBeforeCreate" />
    <TagsDelete v-model:open="isOpenAlertDialog" v-model:tag="currentTag" @on:deleted="refreshBeforeDeleted" />
    <TagsEdit v-model:open="isOpenEditDialog" v-model:tag="currentTag" @on:saved="refreshBeforeSaved" />
  </section>
  <Empty v-else />
</template>

<style lang="scss">
.tags {
  &__header {
    @apply flex items-center gap-x-5 pb-5;
  }

  &__column {
    @apply flex items-center gap-x-2;

    &:first-child {
      @apply border-r pr-4;
    }
  }

  &__form {
    @apply flex flex-col gap-y-5;
  }

  &__dialog {
    @apply max-w-96;
  }

  &__content {
    @apply py-4;
  }

  &__list {
    @apply grid grid-cols-2 gap-3;
  }

  &__item {
    @apply flex items-center justify-between rounded-md bg-zinc-50 px-4 py-2 dark:bg-zinc-900;

    &-wrapper {
      @apply flex items-center gap-x-2;
    }
  }
}
</style>
