<script setup lang="ts">
import { CalendarDate, DateFormatter, type DateValue } from '@internationalized/date';
import { toDate } from 'radix-vue/date';

const modelValue = defineModel<string | undefined>({ required: true });

const df = new DateFormatter('ru-Ru', {
  dateStyle: 'short',
});
const value = ref<DateValue>();
const isOpen = ref<boolean>();

onMounted(() => {
  if (!modelValue.value) return;

  const date = df.format(new Date(modelValue.value)).toString();
  const splitDate = date.split('.').map((e) => +e);

  value.value = new CalendarDate(splitDate[2]!, splitDate[1]!, splitDate[0]!);
});

watch(value, () => {
  isOpen.value = false;

  if (value.value) {
    modelValue.value = new Date(toDate(value.value)).toISOString();
  }
});

watch(modelValue, () => {
  if (modelValue.value === undefined) {
    value.value = undefined;
  }
});
</script>

<template>
  <UiPopover v-model:open="isOpen">
    <UiPopoverTrigger as-child>
      <UiFormControl>
        <UiButton
          variant="ghost"
          :class="
            cn(
              'flex w-full cursor-pointer items-center justify-normal rounded-md border border-input bg-background px-3 py-2 ps-3 text-start text-sm font-normal ring-offset-background placeholder:text-muted-foreground hover:bg-transparent focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-background dark:hover:text-white [&>span]:line-clamp-1',
              !value && 'text-muted-foreground',
            )
          "
        >
          <span>{{ value ? df.format(toDate(value)) : 'Выберите дату' }}</span>
          <Icon name="solar:calendar-linear" class="ml-auto h-4 w-4" />
        </UiButton>
      </UiFormControl>
    </UiPopoverTrigger>
    <UiPopoverContent class="w-auto p-0">
      <UiCalendar v-model="value" calendar-label="Дата" locale="ru-RU" />
    </UiPopoverContent>
  </UiPopover>
</template>
