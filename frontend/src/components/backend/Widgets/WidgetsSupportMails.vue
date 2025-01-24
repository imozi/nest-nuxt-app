<script setup lang="ts">
const { data } = useNuxtData<{ mailYear: { month: string; count: number }[]; mail: string }>('statistics');
const { mail, mailYear } = data.value!;

const chartData = computed(() =>
  mailYear.map((item) => {
    return {
      name: monthNumberToWord(new Date(item.month).getMonth()),
      total: +item.count,
    };
  }),
);
</script>

<template>
  <div class="widgets-support-mails">
    <div class="widgets-support-mails__icon">
      <Icon name="solar:inbox-unread-linear" class="size-8" />
    </div>
    <div class="widgets-support-mails__wrapper">
      <div class="widgets-support-mails__total">
        <p v-if="!+mail">{{ mail }}</p>
        <UiDonutChart v-else index="name" category="total" show-legend show-tooltip :data="chartData" />
      </div>
      <div class="widgets-support-mails__name">
        <h3>Всего обращений</h3>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.widgets-support-mails {
  @apply flex flex-[1_1_calc(33.333333%_-_1rem)] rounded-md border p-4;

  &__wrapper {
    @apply flex flex-grow flex-col;
  }

  &__name {
    @apply mx-auto mt-auto text-muted-foreground;
  }

  &__total {
    @apply m-auto mb-2 flex items-center gap-x-3 text-8xl font-semibold;
  }

  &__icon {
    @apply flex h-full w-9 items-center justify-center rounded-md bg-teal-600 p-1 text-white;
  }
}
</style>
