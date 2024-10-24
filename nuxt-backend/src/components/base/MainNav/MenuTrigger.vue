<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

const { menu } = useMenuStore();

type MenuTriggerProps = {
  class?: HTMLAttributes['class'];
};

const props = defineProps<MenuTriggerProps>();

const onClickCollapse = () => {
  menu.collapsed = !menu.collapsed;
};
</script>

<template>
  <UiTooltipProvider :delay-duration="100">
    <UiTooltip>
      <UiTooltipTrigger as-child>
        <UiButton type="button" variant="ghost" size="icon" :class="props.class" @click="onClickCollapse">
          <Icon
            name="solar:send-square-linear"
            class="size-5 rotate-0 transition-all"
            :class="{ '-rotate-0': menu.collapsed, 'scale-0': menu.collapsed }"
          />
          <Icon
            name="solar:send-square-linear"
            class="absolute size-5 rotate-180 scale-0 transition-all"
            :class="{ 'rotate-0': menu.collapsed, 'scale-100': menu.collapsed }"
          />
        </UiButton>
      </UiTooltipTrigger>
      <UiTooltipContent v-if="!menu.collapsed" side="right">
        <p>Свернуть</p>
      </UiTooltipContent>
      <UiTooltipContent v-else side="right">
        <p>Развернуть</p>
      </UiTooltipContent>
    </UiTooltip>
  </UiTooltipProvider>
</template>
