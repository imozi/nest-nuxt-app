<script setup lang="ts">
const currentTab = ref<'material' | 'material-page'>('material');
const formRef = useTemplateRef('formRef');

const isSaved = ref<boolean>(false);

const onClickCancel = () => {
  navigateTo('/dashboard/materials');
};

watch(currentTab, () => {
  formRef.value?.resetForm();
});
</script>

<template>
  <UiTabs v-model:model-value="currentTab" class="material" default-value="material">
    <form class="grid gap-5" @submit="formRef?.onSubmit">
      <div class="material__wrapper">
        <div class="material__title">
          <Icon name="solar:hashtag-square-linear" class="size-5" />
          <p>Создать</p>
        </div>
        <ClientOnly>
          <UiTabsList class="material__list">
            <UiTabsTrigger value="material"> материал </UiTabsTrigger>
            <UiTabsTrigger value="material-page"> страницу с материалами </UiTabsTrigger>
          </UiTabsList>
        </ClientOnly>
        <div class="menu__collumn">
          <UiAlertDialog>
            <UiAlertDialogTrigger as-child>
              <UiButton variant="outline" class="text-muted-foreground"> Отмена </UiButton>
            </UiAlertDialogTrigger>
            <UiAlertDialogContent>
              <UiAlertDialogHeader>
                <UiAlertDialogTitle>Вы уверены?</UiAlertDialogTitle>
                <UiAlertDialogDescription> Вы уверены что хотите отменить создание материала? </UiAlertDialogDescription>
              </UiAlertDialogHeader>
              <UiAlertDialogFooter>
                <UiAlertDialogCancel>Нет</UiAlertDialogCancel>
                <UiAlertDialogAction class="text-white" :disabled="isSaved" @click="onClickCancel"> Да </UiAlertDialogAction>
              </UiAlertDialogFooter>
            </UiAlertDialogContent>
          </UiAlertDialog>

          <UiButton type="submit" class="dark:text-white" :disabled="isSaved"> Сохранить </UiButton>
        </div>
      </div>

      <UiTabsContent :value="currentTab" class="material__content">
        <MaterialFormCreate ref="formRef" :mode="currentTab" />
      </UiTabsContent>
    </form>
  </UiTabs>
</template>

<style lang="scss">
.material {
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
