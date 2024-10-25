<script setup lang="ts">
import { ComboboxAnchor, ComboboxContent, ComboboxViewport, ComboboxRoot, ComboboxTrigger } from 'radix-vue';

const { tags, selected } = defineProps<{
  tags: { id: string; name: string }[];
  selected?: { id: string; name: string }[];
}>();
const selectedTags = ref<string[]>([]);
const emit = defineEmits(['on:change-tags']);

const filteredTags = computed(() => tags.filter((i) => !selectedTags.value.includes(i.name)));

watch(
  selectedTags,
  () => {
    emit(
      'on:change-tags',
      selectedTags.value.map((tag) => tags.find((e) => e.name === tag)?.id),
    );
  },
  { deep: true },
);

onMounted(() => {
  if (!selected) return;

  selectedTags.value = selected.map((tag) => tag.name);
});
</script>

<template>
  <ComboboxRoot v-model="selectedTags" class="flex w-full">
    <ComboboxAnchor as-child class="flex-nowrap p-0">
      <UiTagsInput class="w-full gap-0 px-0" :model-value="selectedTags">
        <div class="flex flex-wrap items-center gap-2 p-2">
          <UiTagsInputItem
            v-if="!selectedTags.length"
            :key="'empty'"
            value="Выберите теги"
            class="bg-transparent text-muted-foreground"
          >
            <UiTagsInputItemText />
          </UiTagsInputItem>

          <UiTagsInputItem v-for="item in selectedTags" v-else :key="item" :value="item">
            <UiTagsInputItemText />
            <UiTagsInputItemDelete />
          </UiTagsInputItem>
        </div>
        <UiSeparator orientation="vertical" class="ml-auto" />
        <ComboboxTrigger as-child class="flex">
          <UiButton type="button" variant="ghost" size="sm" class="h-full w-auto rounded-none text-muted-foreground">
            <Icon name="solar:tag-linear" class="size-4" />
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
            <p>Тегов нет</p>
          </UiCommandEmpty>
          <UiCommandGroup as="ul">
            <UiCommandItem
              v-for="tag in filteredTags"
              :key="tag.id"
              as="li"
              :value="tag.name"
              class="cursor-pointer"
              @select.prevent="
                (ev) => {
                  if (typeof ev.detail.value === 'string') {
                    selectedTags.push(ev.detail.value);
                  }
                }
              "
            >
              {{ tag.name }}
            </UiCommandItem>
          </UiCommandGroup>
        </UiCommandList>
      </ComboboxViewport>
    </ComboboxContent>
  </ComboboxRoot>
</template>
