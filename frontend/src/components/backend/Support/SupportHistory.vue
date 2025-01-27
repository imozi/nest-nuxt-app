<script setup lang="ts">
const isOpenDialog = ref<boolean>(false);
const isOpenTooltip = ref<boolean>(false);
const selected = defineModel<SupportMail[]>('selected', { required: true });

const { data, refresh } = await useAsyncData<string>('mails-new', async () => {
  return await $fetchSecure('/support-mail/new', { query: { email: selected.value[0]?.email } });
});

const onClick = () => {
  isOpenDialog.value = !isOpenDialog.value;
};

const onStatusUpdate = () => {
  console.log('upppd');
  refresh();
};

const onMouseover = () => {
  isOpenTooltip.value = true;
};

const onMouseleave = () => {
  isOpenTooltip.value = false;
};

watch(
  () => selected.value[0],
  () => {
    refresh();
  },
);
</script>

<template>
  <UiDialog v-model:open="isOpenDialog">
    <UiDialogTrigger as-child>
      <UiTooltipProvider :delay-duration="100">
        <UiTooltip :open="isOpenTooltip">
          <UiTooltipTrigger as-child>
            <UiButton
              variant="secondary"
              size="sm"
              class="relative ml-auto flex h-full w-auto cursor-pointer items-center justify-start gap-2 p-2 dark:text-white"
              @click.prevent="onClick"
              @mouseover="onMouseover"
              @mouseleave="onMouseleave"
            >
              <UiBadge v-if="data !== '0'" class="absolute -right-2 -top-2">{{ data }}</UiBadge>
              <Icon name="solar:history-outline" class="size-5" />
            </UiButton>
          </UiTooltipTrigger>
          <UiTooltipContent>
            <p>Посмотреть историю</p>
          </UiTooltipContent>
        </UiTooltip>
      </UiTooltipProvider>
    </UiDialogTrigger>

    <UiDialogContent class="h-[calc(100%-50px)] max-w-screen-xl grid-rows-[auto_minmax(0,1fr)_auto] p-0">
      <UiDialogHeader class="p-6 pb-0">
        <UiDialogTitle>История обращений {{ selected[0]!.email }} </UiDialogTitle>
        <UiDialogDescription />
      </UiDialogHeader>
      <SupportHistoryList :id="selected[0]!.id" @on:status-updated="onStatusUpdate" />
    </UiDialogContent>
  </UiDialog>
</template>
