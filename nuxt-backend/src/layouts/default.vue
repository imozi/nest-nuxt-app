<template>
  <header class="header">
    <div class="header__wrapper container">
      <p>header</p>
      <ColorTheme />
    </div>
  </header>
  <div class="wrapper container">
    <aside class="aside aside--left">
      <header class="aside__header">
        <p>aside header</p>
      </header>
      <div class="aside__content">
        <nav>
          <ul>
            <li>
              <UiButton>Dashboard</UiButton>
            </li>
            <li>
              <UiButton variant="ghost">Layouts</UiButton>
            </li>
            <li>
              <UiButton variant="ghost">CRUD</UiButton>
            </li>
            <li>
              <UiButton variant="ghost">Settings</UiButton>
            </li>
            <li>
              <UiButton variant="ghost">Pages</UiButton>
            </li>
            <li>
              <UiButton variant="ghost">Authentication</UiButton>
            </li>
          </ul>
        </nav>
      </div>
      <footer class="aside__footer">
        <p>aside footer</p>
      </footer>
    </aside>
    <div class="wrapper__inner">
      <main class="main">
        <header class="main__header">main header</header>
        <section class="main__content">
          <slot />
        </section>
      </main>
      <footer class="footer">footer</footer>
    </div>
    <aside class="aside aside--right">
      <header class="aside__header">aside header</header>
      <div class="aside__content">
        <p>content</p>
      </div>
      <footer class="aside__footer">
        <p>aside footer</p>
      </footer>
    </aside>
  </div>
</template>

<style lang="scss">
.header {
  @apply sticky top-0 z-50 h-[var(--height-original)] bg-background after:absolute after:bottom-0 after:h-px after:w-full after:bg-gradient-to-r after:from-black/0 after:via-primary after:to-black/0;

  &__wrapper {
    @apply p-5;
  }
}

.wrapper {
  @apply grid grid-cols-[min-content_1fr_min-content] grid-rows-[auto];
}

.aside {
  @apply sticky top-[var(--height-original)] flex h-[calc(100vh_-_var(--height-original))] items-center after:absolute after:h-full after:w-px after:bg-gradient-to-b after:from-black/0 after:via-primary/20 after:to-black/0;

  &--left {
    @apply after:right-0;
  }

  &--right {
    @apply after:left-0;
  }

  &__content {
    @apply h-[calc(100%_-var(--height-inner)_*2)] w-full overflow-x-hidden p-5;

    &::-webkit-scrollbar {
      @apply w-0;
    }

    &:empty {
      @apply p-0;
    }
  }

  &__header {
    @apply absolute left-0 top-0 z-50 flex h-[var(--height-inner)] w-full p-5;

    &:empty {
      @apply h-0 p-0;
    }
  }

  &__footer {
    @apply absolute bottom-0 left-0 z-50 h-[var(--height-inner)] w-full p-5;

    &:empty {
      @apply h-0 p-0;
    }
  }
}

.main {
  @apply h-[calc(100%_-_var(--height-original))];

  &__header {
    @apply sticky top-[var(--height-original)] z-50 h-[var(--height-inner)] bg-background px-16 py-5;

    &:empty {
      @apply h-0 p-0;
    }
  }

  &__content {
    @apply grid content-baseline gap-10 px-16 py-5;
  }
}

.footer {
  @apply relative bottom-0 right-0 h-[var(--height-inner)] w-full p-5 after:absolute after:top-0 after:h-px after:w-full after:bg-gradient-to-r after:from-black/0 after:via-primary after:to-black/0;
}
</style>
