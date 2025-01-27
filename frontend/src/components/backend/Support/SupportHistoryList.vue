<script setup lang="ts">
import { useFilterSupportHistory } from './composables/useFilterSupportHistory';

const props = defineProps<{ id: string }>();
const { data: history, search: searchHistory, filters, status, refresh } = await useFilterSupportHistory(props.id);

const emit = defineEmits(['on:status-updated']);

const onRequestNextData = async () => {
  filters.page! += 1;
};

const selected = reactive<SupportMail[]>([]);

const updateStatus = async (newStatus: SupportMail['status']) => {
  selected[0]!.status = newStatus;

  const promise = async () => {
    try {
      await $fetchSecure('/support-mail/history', { method: 'PATCH', body: { id: selected[0]?.id, status: newStatus } });
      refresh();
      emit('on:status-updated');
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
      await $fetchSecure('/support-mail/history', { method: 'DELETE', body: { id: selected[0]?.id } });
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
</script>

<template>
  <section class="pages">
    <div class="pages__wrapper">
      <header class="pages__header">
        <div class="pages__column">
          <Icon name="solar:hashtag-square-linear" class="size-5" />
          <p>Обращения</p>
        </div>
        <div class="pages__column">
          <div class="relative w-full max-w-sm items-center">
            <UiInput id="search-history" v-model="searchHistory" type="text" placeholder="Поиск..." class="pl-10" />
            <span class="absolute inset-y-0 start-0 flex items-center justify-center px-2">
              <Icon name="lucide:search" class="size-4 text-muted-foreground" />
            </span>
          </div>
        </div>
      </header>
      <UiSeparator />
      <div class="pages__content h-full">
        <ClientOnly>
          <UiResizablePanelGroup direction="horizontal">
            <UiResizablePanel :default-size="30" :min-size="30" :max-size="30">
              <SupportMailList
                :mails="history!.data"
                :selected="selected"
                :loading="status === 'pending'"
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
                  <SupportHistoryControls :selected="selected" @update:status="updateStatus" @on:delete-confirmed="onDelete" />
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
        </ClientOnly>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.pages {
  @apply relative grid gap-4 overflow-y-auto px-6 py-4;

  overflow: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  &__header {
    @apply flex items-center gap-x-5 pb-5;
  }

  &__column {
    @apply flex items-center gap-x-2;

    &:first-child {
      @apply border-r pr-4;
    }
  }

  &__list {
    @apply flex flex-col gap-y-3;
  }

  &__item {
    @apply flex;
  }
}
</style>
