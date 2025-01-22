<script setup lang="ts">
const signOut = async () => {
  await $fetchSecure('auth/signout-all', { method: 'POST' });
  navigateTo({ path: '/dashboard', query: { signout: 'true' } }, { redirectCode: 301 });
};
</script>

<template>
  <UiTooltipProvider :delay-duration="100">
    <UiTooltip>
      <UiTooltipTrigger as-child>
        <UiButton type="button" variant="ghost" size="icon" @click="signOut">
          <Icon name="solar:exit-linear" class="size-5" />
        </UiButton>
      </UiTooltipTrigger>
      <UiTooltipContent>
        <p>Выйти из всех сессий</p>
      </UiTooltipContent>
    </UiTooltip>
  </UiTooltipProvider>
</template>

<style lang="scss">
.sign-out {
  @apply justify-start gap-x-3;
}
</style>
