<template>
  <section class="empty container-h-area">
    <div class="empty__icon">
      <slot name="icon">
        <Icon name="solar:database-line-duotone" class="size-16" />
      </slot>
    </div>
    <div class="empty__text">
      <slot>
        <p>Записей не найденно</p>
      </slot>
    </div>
  </section>
</template>

<style lang="scss">
.empty {
  @apply flex w-full flex-col items-center justify-center gap-y-4 bg-[radial-gradient(theme(colors.mask/15%)_1px,transparent_1px)] text-muted-foreground [background-size:20px_20px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_50%,transparent_100%)] dark:bg-[radial-gradient(theme(colors.mask/25%)_1px,transparent_1px)] sm:[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_50%,transparent_100%)];

  &__text {
    @apply text-lg font-medium;
  }
}
</style>
