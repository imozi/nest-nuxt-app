<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps({
  error: Object as () => NuxtError,
});

const onClearError = () => clearError({ redirect: '/' });
</script>

<template>
  <ColorTheme class="theme-swicher" />
  <NuxtLayout name="clear">
    <main class="error">
      <div class="error__wrapper">
        <div class="error__content">
          <div class="error__status">
            <h2>{{ props.error?.statusCode }}</h2>
          </div>
          <div class="error__description">
            <p>{{ props.error?.message }}</p>
          </div>
        </div>
        <div class="">
          <UiButton type="button" @click="onClearError">Вернуться дамой</UiButton>
        </div>
      </div>
    </main>
  </NuxtLayout>
</template>

<style lang="scss">
.error {
  @apply relative flex h-dvh items-center justify-center bg-[radial-gradient(theme(colors.border/90%)_1px,transparent_1px)] p-5 [background-size:20px_20px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_50%,transparent_100%)] sm:p-10 sm:[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_50%,transparent_100%)] lg:p-16;

  &__wrapper {
    @apply flex flex-col items-center justify-center gap-16;
  }

  &__content {
    @apply flex flex-col items-center justify-center gap-5;
  }

  &__status {
    @apply text-9xl font-extrabold;
  }
}

.theme-swicher {
  @apply absolute right-5 top-5 z-50 sm:right-10 sm:top-10 lg:right-16 lg:top-16;
}
</style>
