<script setup lang="ts">
const { account } = useAccountStore();
const { menu } = useMenuStore();
</script>

<template>
  <div v-if="!menu.collapsed" class="user-avatar">
    <UiAvatar shape="square">
      <UiAvatarImage v-if="account?.user.avatar" :src="useAssetsPath(account.user.avatar)" :alt="account?.user.name" />
      <UiAvatarFallback>U</UiAvatarFallback>
    </UiAvatar>
    <div class="user-avatar__text">
      <p>{{ account?.user.fullName }}</p>
      <span>{{ account?.shortcut }}</span>
    </div>
  </div>

  <div v-else class="user-avatar">
    <UiHoverCard :open-delay="50" :close-delay="50">
      <UiHoverCardTrigger as-child>
        <UiAvatar shape="square">
          <UiAvatarImage
            v-if="account?.user.avatar"
            :src="useAssetsPath(account.user.avatar)"
            :alt="account?.user.name"
          />
          <UiAvatarFallback>U</UiAvatarFallback>
        </UiAvatar>
      </UiHoverCardTrigger>
      <UiHoverCardContent side="right" align="start">
        <div class="user-avatar__text">
          <p>{{ account?.user.fullName }}</p>
          <span>{{ account?.shortcut }}</span>
        </div>
      </UiHoverCardContent>
    </UiHoverCard>
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
