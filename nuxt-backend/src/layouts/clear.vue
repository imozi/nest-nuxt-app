<template>
  <ColorTheme class="theme-swicher" />
  <div class="wrapper">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  @apply flex h-dvh items-center justify-center bg-[radial-gradient(theme(colors.border/90%)_1px,transparent_1px)] p-5 [background-size:20px_20px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_50%,transparent_100%)] sm:p-10 sm:[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_50%,transparent_100%)] lg:p-16;
}

.theme-swicher {
  @apply absolute right-5 top-5 z-50 sm:right-10 sm:top-10 lg:right-16 lg:top-16;
}
</style>
