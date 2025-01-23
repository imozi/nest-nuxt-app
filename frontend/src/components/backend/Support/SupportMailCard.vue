<script setup lang="ts">
import { DateFormatter } from '@internationalized/date';

type SupportMailProps = {
  mail: SupportMail;
};

const { mail } = defineProps<SupportMailProps>();
const selected = defineModel<SupportMail[]>('selected', { required: true });

const isSelected = computed(() => selected.value.some((item) => item.id === mail.id));

const formatDate = new DateFormatter('ru-Ru', {
  dateStyle: 'short',
});
const formatTime = new DateFormatter('ru-Ru', {
  timeStyle: 'short',
});

const onSelectMail = () => {
  if (isSelected.value) {
    return selected.value.pop();
  }

  selected.value.pop();
  selected.value.push(mail);
};

const statusText = (status: SupportMail['status']) =>
  computed(() => {
    const statusText = {
      new: 'Новая',
      progress: 'В работе',
      technical: 'Проблемы',
      closed: 'Выполненна',
      deferred: 'Отложено',
      viewed: 'Просмотрена',
    };
    return statusText[status];
  });
</script>

<template>
  <UiButton
    type="button"
    variant="ghost"
    class="support-mail-card"
    :class="{ 'support-mail-card--selected': isSelected }"
    @click="onSelectMail"
  >
    <div class="support-mail-card__wrapper">
      <div class="support-mail-card__name">
        <p>{{ mail.name }}</p>
      </div>
      <div class="support-mail-card__question">
        <p>{{ mail.question }}</p>
      </div>

      <div class="support-mail-card__date">
        <p>{{ formatDate.format(new Date(mail.createdAt)) }}</p>
        <p>{{ formatTime.format(new Date(mail.createdAt)) }}</p>
      </div>
    </div>
    <div class="support-mail-card__status">
      <UiBadge :variant="mail.status">{{ statusText(mail.status) }} </UiBadge>
    </div>
  </UiButton>
</template>

<style lang="scss">
.support-mail-card {
  @apply relative flex h-full whitespace-normal rounded-md border text-left text-sm;

  &--selected {
    @apply border-primary bg-muted text-accent-foreground;
  }

  &__wrapper {
    @apply flex flex-col items-start gap-y-1;
  }

  &__name {
    @apply flex font-medium;
  }

  &__question {
    @apply line-clamp-1 font-normal;
  }

  &__date {
    @apply flex gap-x-2 font-normal;
  }

  &__status {
    @apply absolute right-2 top-2 text-xs;
  }
}
</style>
