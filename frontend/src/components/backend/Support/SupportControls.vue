<script setup lang="ts">
const { isIncludeRole } = useAccountStore();
const isOpenDropdown = ref<boolean>(false);
const isOpenTooltip = ref<boolean>(false);

const selected = defineModel<SupportMail[]>('selected', { required: true });
const emit = defineEmits(['update:status', 'on:delete-confirmed']);

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

const statusList = {
  new: 'Новая',
  progress: 'В работе',
  technical: 'Проблемы',
  closed: 'Выполненна',
  deferred: 'Отложено',
  viewed: 'Просмотрена',
};

const statusText = (value: string) =>
  computed(() => {
    return statusList[value];
  });

const status = ref(selected.value[0]?.status);

const changeStatus = (newStatus: string) => {
  emit('update:status', newStatus);
};

watch(
  () => selected.value[0],
  () => {
    status.value = selected.value[0]?.status;
  },
);
</script>

<template>
  <div class="support-controlls">
    <UiDropdownMenu v-model:open="isOpenDropdown">
      <UiDropdownMenuTrigger as-child>
        <UiTooltipProvider :delay-duration="100">
          <UiTooltip :open="isOpenTooltip">
            <UiTooltipTrigger as-child>
              <UiButton
                variant="secondary"
                size="sm"
                class="flex h-full w-auto cursor-pointer items-center justify-start gap-2 p-2 dark:text-white"
                @click.prevent="onClick"
                @mouseover="onMouseover"
                @mouseleave="onMouseleave"
              >
                <Icon name="solar:bill-linear" class="size-5" />
              </UiButton>
            </UiTooltipTrigger>
            <UiTooltipContent> Изменить статус </UiTooltipContent>
          </UiTooltip>
        </UiTooltipProvider>
      </UiDropdownMenuTrigger>
      <UiDropdownMenuContent>
        <UiDropdownMenuLabel>Изменить статус</UiDropdownMenuLabel>
        <UiDropdownMenuSeparator />
        <UiDropdownMenuRadioGroup v-model="status">
          <UiDropdownMenuRadioItem v-for="(item, i) of Object.keys(statusList)" :key="i" :value="item" @select="changeStatus(item)">
            {{ statusText(item) }}
          </UiDropdownMenuRadioItem>
        </UiDropdownMenuRadioGroup>
      </UiDropdownMenuContent>
    </UiDropdownMenu>

    <SupportMailDelete v-if="isIncludeRole('admin')" @on:delete-confirmed="emit('on:delete-confirmed')" />

    <SupportHistory :selected="selected" />
  </div>
</template>

<style lang="scss">
.support-controlls {
  @apply flex items-center gap-x-2;
}
</style>
