<script setup lang="ts" generic="T extends OptionProps">
import { ComboboxAnchor, ComboboxContent, ComboboxViewport, ComboboxRoot, ComboboxTrigger } from 'radix-vue';

export type OptionProps = {
  id: string | number;
  name: string;
};

const { data } = defineProps<{
  data: T[];
}>();
const modelValue = defineModel<string[]>({ required: true });
const filteredData = computed(() => data.filter((i) => !modelValue.value.includes(i.name)));
</script>

<template>
  <ComboboxRoot v-model="modelValue" class="flex w-full">
    <ComboboxAnchor as-child class="flex-nowrap p-0">
      <UiTagsInput class="w-full gap-0 px-0" :model-value="modelValue">
        <div class="flex flex-wrap items-center gap-2 p-2">
          <UiTagsInputItem v-if="!modelValue.length" :key="'empty'" value="Выберите из списка" class="bg-transparent text-muted-foreground">
            <UiTagsInputItemText />
          </UiTagsInputItem>

          <UiTagsInputItem v-for="item in modelValue" v-else :key="item" :value="item">
            <UiTagsInputItemText />
            <UiTagsInputItemDelete />
          </UiTagsInputItem>
        </div>
        <UiSeparator orientation="vertical" class="ml-auto" />
        <ComboboxTrigger as-child class="flex">
          <UiButton type="button" variant="ghost" size="sm" class="h-full w-auto rounded-none text-muted-foreground">
            <Icon name="solar:hamburger-menu-outline" class="size-4" />
          </UiButton>
        </ComboboxTrigger>
      </UiTagsInput>
    </ComboboxAnchor>

    <ComboboxContent>
      <ComboboxViewport>
        <UiCommandList
          position="popper"
          class="mt-2 w-[--radix-popper-anchor-width] rounded-md border bg-popover text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
        >
          <UiCommandEmpty>
            <p>Пунктов нет</p>
          </UiCommandEmpty>
          <UiCommandGroup as="ul">
            <UiCommandItem
              v-for="item in filteredData"
              :key="item.id"
              as="li"
              :value="item.name"
              class="cursor-pointer"
              @select.prevent="
                (ev) => {
                  if (typeof ev.detail.value === 'string') {
                    modelValue.push(ev.detail.value);
                  }
                }
              "
            >
              {{ item.name }}
            </UiCommandItem>
          </UiCommandGroup>
        </UiCommandList>
      </ComboboxViewport>
    </ComboboxContent>
  </ComboboxRoot>
</template>
