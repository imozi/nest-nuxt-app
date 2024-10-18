<script setup lang="ts"></script>

<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UiToaster position="top-center" :expand="false" rich-colors close-button />
</template>
