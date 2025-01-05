<script setup lang="ts">
useSeoMeta({
  title: `ЕСЭД | Главная`,
});
definePageMeta({
  name: 'Главная',
});

const { account } = useAccountStore();
const { data, execute } = await useFetchSecure(`sessions/me`, { immediate: false });

useBreadcrumbs();

const getSessionInfo = async () => {
  execute();
};

const signOut = async () => {
  await $fetchSecure('auth/signout', { method: 'POST' });
  navigateTo({ path: '/', query: { signout: 'true' } }, { redirectCode: 301 });
};
</script>

<template>
  <Empty>
    <p>Страница в разработке</p>
  </Empty>
  <!-- <div v-auto-animate class="">
    <h1>Secret Page</h1>
    <h2>Session info</h2>
    <button type="button" @click="getSessionInfo">Get session info</button>
    <pre>{{ data }}</pre>
    <h3>Account</h3>
    <p>{{ account }}</p>

    <button type="button" @click="signOut">Sign Out</button>

    <NuxtLink to="/"> Back </NuxtLink>
  </div> -->
</template>
