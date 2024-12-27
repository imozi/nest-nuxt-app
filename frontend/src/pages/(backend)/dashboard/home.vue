<script setup lang="ts">
const { account } = useAccountStore();
useBreadcrumbs();
definePageMeta({
  name: 'Главная',
});

const { data, execute } = await useFetchSecure(`sessions/me`, { immediate: false });

const getSessionInfo = async () => {
  execute();
};

const signOut = async () => {
  await $fetchSecure('auth/signout', { method: 'POST' });
  navigateTo({ path: '/', query: { signout: 'true' } }, { redirectCode: 301 });
};
</script>

<template>
  <div v-auto-animate class="">
    <h1>Secret Page</h1>
    <h2>Session info</h2>
    <button type="button" @click="getSessionInfo">Get session info</button>
    <pre>{{ data }}</pre>
    <h3>Account</h3>
    <p>{{ account }}</p>

    <button type="button" @click="signOut">Sign Out</button>

    <NuxtLink to="/"> Back </NuxtLink>
  </div>
</template>
