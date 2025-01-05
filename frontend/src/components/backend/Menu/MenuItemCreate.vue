<script setup lang="ts">
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
</script>

<template>
  <UiDialog v-model:open="isOpenDialog">
    <UiDialogTrigger as-child>
      <UiTooltipProvider :delay-duration="100">
        <UiTooltip :open="isOpenTooltip">
          <UiTooltipTrigger as-child>
            <UiButton variant="secondary" size="icon" @click.prevent="onClick" @mouseover="onMouseover" @mouseleave="onMouseleave">
              <Icon name="solar:menu-dots-square-outline" class="size-5" />
            </UiButton>
          </UiTooltipTrigger>
          <UiTooltipContent>
            <p>Создать пункт меню</p>
          </UiTooltipContent>
        </UiTooltip>
      </UiTooltipProvider>
    </UiDialogTrigger>

    <UiDialogContent>
      <UiDialogHeader>
        <UiDialogTitle>Создать пункт меню</UiDialogTitle>
        <UiDialogDescription>Заполните форму нового пункта меню</UiDialogDescription>
      </UiDialogHeader>
      <UiDialogFooter />
    </UiDialogContent>
  </UiDialog>
</template>
