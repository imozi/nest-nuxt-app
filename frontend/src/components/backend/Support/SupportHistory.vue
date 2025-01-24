<script setup lang="ts">
const isOpenDialog = ref<boolean>(false);
const isOpenTooltip = ref<boolean>(false);
const selected = defineModel<SupportMail[]>('selected', { required: true });

const onClick = () => {
  isOpenDialog.value = !isOpenDialog.value;
};

const onMouseover = () => {
  isOpenTooltip.value = true;
};

const onMouseleave = () => {
  isOpenTooltip.value = false;
};
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
              class="ml-auto flex h-full w-auto cursor-pointer items-center justify-start gap-2 p-2 dark:text-white"
              @click.prevent="onClick"
              @mouseover="onMouseover"
              @mouseleave="onMouseleave"
            >
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
      <SupportHistoryList :id="selected[0]!.id" />
    </UiDialogContent>
  </UiDialog>
</template>
