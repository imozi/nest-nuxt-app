<script setup lang="ts">
type SupportMailList = {
  mails: SupportMail[];
};

const { mails } = defineProps<SupportMailList>();
const selected = defineModel<SupportMail[]>('selected', { required: true });

watch(selected, () => {
  console.log(selected);
});
</script>

<template>
  <UiScrollArea class="support-mail-area container-h-area">
    <List class="support-mail-area__list">
      <ListItem v-for="mail of mails" :key="mail.id" class="support-mail-area__item">
        <SupportMailCard :mail="mail" :selected="selected" />
      </ListItem>
    </List>
  </UiScrollArea>
</template>

<style lang="scss">
.support-mail-area {
  &__list {
    @apply flex flex-col gap-y-1 pr-3;
  }
}
</style>
