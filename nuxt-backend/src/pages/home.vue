<script setup lang="ts">
const { token } = useTokenStore();
const { account } = useAccountStore();

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
  <div class="">
    <h1>Secret Page</h1>
    <p>{{ token }}</p>
    <h2>Session info</h2>
    <button type="button" @click="getSessionInfo">Get session info</button>
    <pre>{{ data }}</pre>
    <h3>Account</h3>
    <pre>{{ account }}</pre>

    <button type="button" @click="signOut">Sign Out</button>
  </div>

  <NuxtLink to="/"> Back </NuxtLink>
</template>
