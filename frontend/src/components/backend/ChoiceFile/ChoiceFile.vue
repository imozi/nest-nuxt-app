<script setup lang="ts">
const isOpenDialog = ref<boolean>(false);
const isOpenTooltip = ref<boolean>(false);
const modelValue = defineModel<FileApi[]>({ required: true });

type ChoiceFileProps = {
  mode?: 'single' | 'many';
};

const { mode = 'single' } = defineProps<ChoiceFileProps>();

const onSelectFile = (file: FileApi) => {
  isOpenDialog.value = false;

  if (mode === 'single') {
    modelValue.value.length = 0;
    return (modelValue.value = [{ ...file, originalName: file.originalName.slice(0, file.originalName.lastIndexOf('.')) }]);
  }

  modelValue.value = [...modelValue.value, { ...file, originalName: file.originalName.slice(0, file.originalName.lastIndexOf('.')) }];
};

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
              size="icon"
              class="w-full"
              @click.prevent="onClick"
              @mouseover="onMouseover"
              @mouseleave="onMouseleave"
            >
              <Icon name="solar:add-square-outline" class="size-5" />
            </UiButton>
          </UiTooltipTrigger>
          <UiTooltipContent>
            <p>Выбрать файл</p>
          </UiTooltipContent>
        </UiTooltip>
      </UiTooltipProvider>
    </UiDialogTrigger>

    <UiDialogContent class="h-full max-w-screen-xl grid-rows-[auto_minmax(0,1fr)_auto] p-0">
      <UiDialogHeader class="p-6 pb-0">
        <UiDialogTitle>Выбрите файл</UiDialogTitle>
        <UiDialogDescription />
      </UiDialogHeader>
      <div class="file-content-dialog grid gap-4 overflow-y-auto px-6 py-4">
        <div class="flex flex-col justify-between">
          <FilesViewer choice double-click-choice @on:chice-file="onSelectFile" />
        </div>
      </div>
    </UiDialogContent>
  </UiDialog>
</template>
