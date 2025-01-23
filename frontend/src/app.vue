<script setup lang="ts"></script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <div class="tools">
    <NuxtLoadingIndicator />
    <UiToaster position="top-center" :expand="false" rich-colors close-button />
  </div>
</template>
