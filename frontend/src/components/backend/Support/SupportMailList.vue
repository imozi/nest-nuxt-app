<script setup lang="ts">
type SupportMailList = {
  mails: SupportMail[];
  loading?: boolean;
};

const { mails, loading } = defineProps<SupportMailList>();
const selected = defineModel<SupportMail[]>('selected', { required: true });
const emit = defineEmits(['on:scroll-bottom']);
</script>

<template>
  <div class="support-mail-wrapper">
    <div class="pr-3 pt-2">
      <slot name="support-list-header" />
    </div>
    <UiScrollArea v-if="mails.length" class="support-mail-area" @on:scroll-bottom="emit('on:scroll-bottom')">
      <List v-auto-animate="{ duration: 200 }" class="support-mail-area__list">
        <ListItem v-for="mail of mails" :key="mail.id" class="support-mail-area__item">
          <SupportMailCard :mail="mail" :selected="selected" />
        </ListItem>
        <ListItem v-if="loading" class="support-mail-area__item support-mail-area__loader">
          <Loader variant="primary" size="sm" />
        </ListItem>
      </List>
    </UiScrollArea>

    <Empty v-else />
  </div>
</template>

<style lang="scss">
.support-mail-area {
  @apply h-[calc(100vh_-_(var(--height-original)_+_(var(--height-inner)_*_2))_-_85px)];

  &__list {
    @apply flex flex-col gap-y-1 pr-3 pt-2;
  }

  &__loader {
    @apply flex items-center justify-center p-4;
  }
}
</style>
