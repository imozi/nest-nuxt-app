<script setup lang="ts">
import { useFilterSupport } from './composables/useFilterSupport';

const { data: support, search, filters, status, refresh } = await useFilterSupport();

const selected = reactive<SupportMail[]>([]);

const onRequestNextData = async () => {
  filters.page! += 1;
};

const updateStatus = async (newStatus: SupportMail['status']) => {
  selected[0]!.status = newStatus;

  const promise = async () => {
    try {
      await $fetchSecure('/support-mail', { method: 'PATCH', body: { id: selected[0]?.id, status: newStatus } });
      refresh();
      return 'Статус успешно изменен!';
    } catch (error) {
      const err = (error as IFetchError<ResponseError>).data;
      throw new Error(err?.message);
    }
  };

  toast.promise(promise, {
    loading: 'Сохранение...',
    success: (message: string) => {
      return message;
    },
    error: (err: ResponseError) => {
      return err.message;
    },
  });
};

const onDelete = async () => {
  const promise = async () => {
    try {
      await $fetchSecure('/support-mail', { method: 'DELETE', body: { id: selected[0]?.id } });
      selected.length = 0;
      refresh();
      return 'Обращение успешно удалено!';
    } catch (error) {
      const err = (error as IFetchError<ResponseError>).data;
      throw new Error(err?.message);
    }
  };

  toast.promise(promise, {
    loading: 'Удаление...',
    success: (message: string) => {
      return message;
    },
    error: (err: ResponseError) => {
      return err.message;
    },
  });
};

watch(search, () => {
  selected.length = 0;
});
</script>

<template>
  <ClientOnly v-if="support">
    <div class="support">
      <div class="support__wrapper">
        <header class="support__header">
          <div class="support__column">
            <Icon name="solar:hashtag-square-linear" class="size-5" />
            <p>Обращения</p>
          </div>
          <div class="support__column">
            <div class="relative w-full max-w-sm items-center">
              <UiInput id="search" v-model="search" type="text" placeholder="Поиск..." class="pl-10" />
              <span class="absolute inset-y-0 start-0 flex items-center justify-center px-2">
                <Icon name="lucide:search" class="size-4 text-muted-foreground" />
              </span>
            </div>
            <SupportMailCreate @on:created="refresh" />
          </div>
        </header>
      </div>
      <UiSeparator />
      <UiResizablePanelGroup direction="horizontal">
        <UiResizablePanel :default-size="30" :min-size="30" :max-size="30">
          <SupportMailList
            :mails="support.data"
            :loading="status === 'pending'"
            :selected="selected"
            @on:scroll-bottom="onRequestNextData"
          />
        </UiResizablePanel>
        <UiResizableHandle disabled />
        <UiResizablePanel>
          <Empty v-if="!selected.length">
            <template #icon>
              <Icon name="solar:inbox-line-outline" class="size-16" />
            </template>
            <p>Выберите обращение</p>
          </Empty>

          <div v-else class="support__mail-content">
            <div class="support__mail-controls">
              <SupportControls :selected="selected" @update:status="updateStatus" @on:delete-confirmed="onDelete" />
            </div>
            <div class="support__mail-wrapper">
              <div class="support__mail-name">
                <h3>От: {{ selected[0]?.name }}</h3>
              </div>
              <div class="support__mail-email">
                <p>({{ selected[0]?.email }})</p>
              </div>
              <div class="support__mail-remote-id">
                <p>Ассистент ID: {{ selected[0]?.remoteId }}</p>
              </div>
            </div>
            <div class="support__mail-wrapper">
              <div class="support__mail-organization">
                <p>Организация: {{ selected[0]?.organization }}</p>
              </div>
              <div class="support__mail-position">
                <p>Должность: {{ selected[0]?.position }}</p>
              </div>
            </div>
            <UiSeparator class="my-2" />
            <div class="support__mail-question">
              <p>{{ selected[0]?.question }}</p>
            </div>
          </div>
        </UiResizablePanel>
      </UiResizablePanelGroup>
    </div>
  </ClientOnly>
  <Empty v-else />
</template>

<style lang="scss">
.support {
  @apply h-[calc(100vh_-_(var(--height-original)_+_(var(--height-inner)_*_2))_-_40px)];

  &__header {
    @apply flex items-center gap-x-5 pb-5;
  }

  &__column {
    @apply flex items-center gap-x-2;

    &:first-child {
      @apply border-r pr-4;
    }
  }

  &__mail-content {
    @apply flex flex-col px-5 py-3;
  }

  &__mail-controls {
    @apply mb-5;
  }

  &__mail-wrapper {
    @apply mb-1 flex gap-3;
  }

  &__mail-email {
    @apply text-muted-foreground;
  }

  &__mail-organization {
    @apply text-sm text-muted-foreground;
  }

  &__mail-position {
    @apply text-sm text-muted-foreground;
  }

  &__mail-question {
    @apply py-3;
  }

  &__mail-remote-id {
    @apply ml-auto text-sm text-muted-foreground;
  }
}
</style>
