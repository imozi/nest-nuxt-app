<script setup lang="ts"></script>

<template>
  <div class="logo-text">
    <div class="mr-2 h-9 w-9">
      <UnLazyImage :src="useAssetsPath('/public/default/logo.svg')" class="rounded" />
    </div>
    <div class="flex flex-col">
      <p class="font-medium">ЕСЭД</p>
      <span class="text-[10px] text-muted-foreground">полезные ресурсы и инструменты</span>
    </div>
  </div>
</template>

<style lang="scss">
.logo-text {
  @apply flex;
}
</style>
