<script setup lang="ts">
const props = defineProps<{ count: number }>();

const declension = computed(() => getDeclension(props.count, ['файл', 'файла', 'файлов']));
const isOpenDialog = ref<boolean>(false);
const isOpenTooltip = ref<boolean>(false);

const onClick = () => {
  isOpenDialog.value = !isOpenDialog.value;
  isOpenTooltip.value = !isOpenTooltip.value;
};

const onMouseover = () => {
  isOpenTooltip.value = true;
};

const onMouseleave = () => {
  isOpenTooltip.value = false;
};

const emit = defineEmits(['on:delete-confirmed']);

const onDeleteConfirmed = () => {
  emit('on:delete-confirmed');
};
</script>

<template>
  <UiAlertDialog v-model:open="isOpenDialog">
    <UiAlertDialogTrigger as-child>
      <UiTooltipProvider :delay-duration="100">
        <UiTooltip :open="isOpenTooltip">
          <UiTooltipTrigger as-child>
            <UiButton
              :disabled="!props.count"
              variant="secondary"
              size="sm"
              class="ml-auto flex h-full cursor-pointer items-center justify-start gap-2 p-2 dark:text-white"
              @click.prevent="onClick"
              @mouseover="onMouseover"
              @mouseleave="onMouseleave"
            >
              <Icon name="solar:trash-bin-trash-outline" class="size-5" />
            </UiButton>
          </UiTooltipTrigger>
          <UiTooltipContent>
            <p>Удалить</p>
          </UiTooltipContent>
        </UiTooltip>
      </UiTooltipProvider>
    </UiAlertDialogTrigger>

    <UiAlertDialogContent>
      <UiAlertDialogHeader>
        <UiAlertDialogTitle>Вы уверены?</UiAlertDialogTitle>
        <UiAlertDialogDescription> Вы уверены что хотите {{ declension }} ? </UiAlertDialogDescription>
      </UiAlertDialogHeader>
      <UiAlertDialogFooter>
        <UiAlertDialogCancel>Нет</UiAlertDialogCancel>
        <UiAlertDialogAction class="text-white" @click="onDeleteConfirmed"> Да </UiAlertDialogAction>
      </UiAlertDialogFooter>
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>
