<script setup lang="ts">
import { DateFormatter, type DateValue, CalendarDate } from '@internationalized/date';
import { toDate } from 'radix-vue/date';

type DatePickerProps = {
  name: string;
  date?: string;
};

const props = defineProps<DatePickerProps>();
const emit = defineEmits(['on:updateDate']);

const df = new DateFormatter('ru-Ru', {
  dateStyle: 'short',
});
const value = ref<DateValue>();
const isOpen = ref<boolean>();

const onUpdateDate = () => {
  isOpen.value = false;

  if (value.value) {
    return emit('on:updateDate', new Date(toDate(value.value)).toISOString());
  }

  return undefined;
};

onMounted(() => {
  if (!props.date) return;
  const date = df.format(new Date(props.date)).toString();
  const splitDate = date.split('.').map((e) => +e);

  value.value = new CalendarDate(splitDate[2], splitDate[1], splitDate[0]);
});
</script>

<template>
  <UiFormField :name="props.name">
    <UiFormItem class="flex flex-col gap-y-2">
      <UiFormLabel>Дата</UiFormLabel>
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
          <UiCalendar v-model="value" calendar-label="Дата" locale="ru-RU" @update:model-value="onUpdateDate" />
        </UiPopoverContent>
      </UiPopover>
      <UiFormMessage />
    </UiFormItem>
  </UiFormField>
</template>
