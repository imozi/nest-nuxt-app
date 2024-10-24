<script setup lang="ts">
type MenuItemDropdownProps = {
  icon: string;
  name: string;
  to: string;
};

const props = defineProps<MenuItemDropdownProps>();
const isOpenDropdown = ref<boolean>(false);
const isOpenTooltip = ref<boolean>(false);

const onClick = () => {
  isOpenDropdown.value = !isOpenDropdown.value;
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
  <UiDropdownMenu v-model:open="isOpenDropdown">
    <UiDropdownMenuTrigger as-child>
      <UiTooltipProvider :delay-duration="100">
        <UiTooltip :open="isOpenTooltip">
          <UiTooltipTrigger as-child>
            <UiButton
              type="button"
              variant="ghost"
              size="icon"
              @click.prevent="onClick"
              @mouseover="onMouseover"
              @mouseleave="onMouseleave"
            >
              <Icon :name="props.icon" class="size-5" />
            </UiButton>
          </UiTooltipTrigger>
          <UiTooltipContent side="right">
            <p>{{ props.name }}</p>
          </UiTooltipContent>
        </UiTooltip>
      </UiTooltipProvider>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent side="right" align="start">
      <UiDropdownMenuLabel>{{ props.name }}</UiDropdownMenuLabel>
      <UiDropdownMenuSeparator />
      <UiDropdownMenuItem as-child>
        <ButtonLink :link="{ to: props.to }" active>Все</ButtonLink>
      </UiDropdownMenuItem>
      <UiDropdownMenuItem as-child>
        <ButtonLink :link="{ to: `${props.to}/create` }" active> Создать </ButtonLink>
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>
