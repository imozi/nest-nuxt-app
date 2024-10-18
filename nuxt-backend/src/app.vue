<script setup lang="ts"></script>

<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <UiToaster position="top-center" :expand="false" rich-colors close-button />
    <NuxtPage />
  </NuxtLayout>
</template>
