<script setup lang="ts">
const route = useRoute();

const layouts = computed(() => {
  const isPathDashboard = route.fullPath.startsWith('/dashboard');
  const afterDashboard = route.fullPath.substring('/dashboard'.length);

  switch (true) {
    case isPathDashboard && afterDashboard.length > 0 && !afterDashboard.includes('?signout=true'):
      return 'dashboard';
    case isPathDashboard &&
      (afterDashboard.length === 0 || afterDashboard === '/' || afterDashboard.includes('?signout=true')):
      return 'clear';
    default:
      return 'default';
  }
});
</script>

<template>
  <NuxtLayout :name="layouts">
    <NuxtPage />
  </NuxtLayout>
  <div class="tools">
    <NuxtLoadingIndicator />
    <UiToaster position="top-center" :expand="false" rich-colors close-button />
  </div>
</template>
