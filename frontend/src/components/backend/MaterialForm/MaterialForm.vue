<script setup lang="ts">
type MaterialFormProps = {
  mode?: 'create' | 'edit';
  type?: 'material' | 'material-page';
};
const { mode = 'create', type = 'material' } = defineProps<MaterialFormProps>();

const currentTab = ref<'material' | 'material-page'>(type);
const formRef = useTemplateRef('formRef');
const { data: material } = useNuxtData<MaterialSingle>('material');

const isSaved = ref<boolean>(false);

const onClickCancel = () => {
  navigateTo('/dashboard/materials');
};

const onClickConfirmedDelete = () => {
  isSaved.value = true;

  const promise = async () => {
    try {
      await $fetchSecure(`/materials`, { body: { id: material.value?.id }, method: 'DELETE' });
      return 'Материал успешно удален!';
    } catch (error) {
      const err = (error as IFetchError<ResponseError>).data;
      throw createError({ message: err?.message, statusCode: err?.statusCode });
    }
  };

  toast.promise(promise, {
    loading: 'Удаление...',
    success: (message: string) => {
      isSaved.value = false;
      navigateTo('/dashboard/materials');
      return message;
    },
    error: (err: ResponseError) => {
      isSaved.value = false;
      return err.message;
    },
  });
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
          <p>{{ mode === 'create' ? 'Создать' : 'Редактировать' }}</p>
        </div>
        <ClientOnly>
          <UiTabsList class="material__list">
            <UiTabsTrigger value="material" :disabled="mode === 'edit' && type === 'material-page'"> материал </UiTabsTrigger>
            <UiTabsTrigger value="material-page" :disabled="mode === 'edit' && type === 'material'"> страницу с материалами </UiTabsTrigger>
          </UiTabsList>
        </ClientOnly>
        <div class="menu__collumn">
          <UiAlertDialog>
            <UiAlertDialogTrigger as-child>
              <UiButton v-if="mode === 'create'" variant="outline" class="text-muted-foreground"> Отмена </UiButton>
              <UiButton v-else variant="destructive"> Удалить </UiButton>
            </UiAlertDialogTrigger>
            <UiAlertDialogContent>
              <UiAlertDialogHeader>
                <UiAlertDialogTitle>Вы уверены?</UiAlertDialogTitle>
                <UiAlertDialogDescription>
                  Вы уверены что хотите {{ mode === 'edit' ? 'удалить материал' : 'отменить создание материала ' }}?
                </UiAlertDialogDescription>
              </UiAlertDialogHeader>
              <UiAlertDialogFooter>
                <UiAlertDialogCancel>Нет</UiAlertDialogCancel>
                <UiAlertDialogAction v-if="mode === 'create'" class="text-white" :disabled="isSaved" @click="onClickCancel">
                  Да
                </UiAlertDialogAction>
                <UiAlertDialogAction v-else class="text-white" :disabled="isSaved" @click="onClickConfirmedDelete">
                  Да
                </UiAlertDialogAction>
              </UiAlertDialogFooter>
            </UiAlertDialogContent>
          </UiAlertDialog>

          <UiButton type="submit" class="dark:text-white" :disabled="isSaved"> Сохранить </UiButton>
        </div>
      </div>

      <UiTabsContent :value="currentTab" class="material__content">
        <MaterialFormEdit v-if="mode === 'edit'" ref="formRef" :mode="currentTab" />
        <MaterialFormCreate v-else ref="formRef" :mode="currentTab" />
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
