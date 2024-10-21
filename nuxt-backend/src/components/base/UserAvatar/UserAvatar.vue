<script setup lang="ts">
const { account } = useAccountStore();
</script>

<template>
  <div class="user-avatar">
    <UiAvatar>
      <UiAvatarImage v-if="account?.user.avatar" :src="useAssetsPath(account.user.avatar)" alt="@radix-vue" />
      <UiAvatarFallback>U</UiAvatarFallback>
    </UiAvatar>
    <div class="user-avatar__text">
      <p>{{ account?.user.fullName }}</p>
      <span>{{ account?.shortcut }}</span>
    </div>
  </div>
</template>

<style lang="scss">
.user-avatar {
  @apply flex items-center gap-x-3;

  &__text {
    @apply text-sm;

    & span {
      @apply text-xs text-muted-foreground;
    }
  }
}
</style>
