<script setup lang="ts"></script>

<template>
  <Header />
  <div class="wrapper container">
    <AsideLeft />
    <div class="wrapper__inner">
      <Main>
        <slot />
      </Main>
      <Footer />
    </div>
    <AsideRight />
  </div>
</template>

<style lang="scss">
.wrapper {
  @apply grid grid-cols-[min-content_1fr_min-content] grid-rows-[auto];
}
</style>
