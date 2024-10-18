<template>
  <header class="header" />
  <main class="main">
    <aside class="aside border p-3"><ColorTheme /></aside>

    <UiScrollArea class="main__area">
      <section class="main__content">
        <slot />
      </section>
    </UiScrollArea>
  </main>
  <footer class="footer" />
</template>

<style lang="scss">
.main {
  @apply grid h-screen grid-cols-[max-content,1fr];
}

.wrapper {
  @apply h-full;
}

.aside {
  @apply h-full min-w-52;
}
</style>
