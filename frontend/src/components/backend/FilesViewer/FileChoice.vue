<script setup lang="ts">
const props = defineProps<{ count: number }>();

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

const emit = defineEmits(['on:choice-confirmed']);

const onChoiceConfirmed = () => {
  emit('on:choice-confirmed');
};
</script>

<template>
  <UiTooltipProvider :delay-duration="100">
    <UiTooltip :open="isOpenTooltip">
      <UiTooltipTrigger as-child>
        <UiButton
          :disabled="!props.count"
          variant="secondary"
          size="sm"
          class="ml-auto flex h-full cursor-pointer items-center justify-start gap-2 p-2 dark:text-white"
          @click.prevent="onClick"
          @click="onChoiceConfirmed"
          @mouseover="onMouseover"
          @mouseleave="onMouseleave"
        >
          <Icon name="solar:file-check-linear" class="size-5" />
        </UiButton>
      </UiTooltipTrigger>
      <UiTooltipContent>
        <p>Выбрать</p>
      </UiTooltipContent>
    </UiTooltip>
  </UiTooltipProvider>
</template>
