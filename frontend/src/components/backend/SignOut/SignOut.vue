<script setup lang="ts">
const { menu } = useMenuStore();

const signOut = async () => {
  await $fetchSecure('auth/signout', { method: 'POST' });
  navigateTo({ path: '/dashboard', query: { signout: 'true' } }, { redirectCode: 301 });
};
</script>

<template>
  <UiButton v-if="!menu.collapsed" type="button" variant="ghost" class="sign-out" @click="signOut">
    <Icon name="solar:exit-linear" class="size-5" />
    <p>Выйти</p>
  </UiButton>
  <UiTooltipProvider v-else :delay-duration="100">
    <UiTooltip>
      <UiTooltipTrigger as-child>
        <UiButton type="button" variant="ghost" size="icon" @click="signOut">
          <Icon name="solar:exit-linear" class="size-5" />
        </UiButton>
      </UiTooltipTrigger>
      <UiTooltipContent>
        <p>Выйти</p>
      </UiTooltipContent>
    </UiTooltip>
  </UiTooltipProvider>
</template>

<style lang="scss">
.sign-out {
  @apply justify-start gap-x-3;
}
</style>
