<script setup lang="ts">
import { useFilterSupport } from './composables/useFilterSupport';

const { data: support, search, filters, status } = await useFilterSupport();

const selected = reactive<SupportMail[]>([]);

const onRequestNextData = async () => {
  filters.page! += 1;
};

watch(search, () => {
  selected.length = 0;
});
</script>

<template>
  <ClientOnly v-if="support">
    <div class="support">
      <UiResizablePanelGroup direction="horizontal">
        <UiResizablePanel :default-size="30" :min-size="30" :max-size="30">
          <div class="grid grid-cols-[max-content,1fr]">
            <div class="p-2" />
            <SupportMailList
              :mails="support.data"
              :loading="status === 'pending'"
              :selected="selected"
              @on:scroll-bottom="onRequestNextData"
            >
              <template #support-list-header>
                <div class="relative">
                  <UiInput id="search" v-model="search" type="text" placeholder="Поиск..." class="pl-10" />
                  <span class="absolute inset-y-0 start-0 flex items-center justify-center px-2">
                    <Icon name="lucide:search" class="size-4 text-muted-foreground" />
                  </span>
                </div>
              </template>
            </SupportMailList>
          </div>
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
              <UiButton variant="ghost" size="icon">
                <Icon name="" class="size-5" />
              </UiButton>
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

  &__mail-content {
    @apply flex flex-col px-5 py-3;
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
