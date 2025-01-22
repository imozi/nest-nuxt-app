import { appendResponseHeader } from 'h3';
import { useTokenStore } from '#imports';

export default defineNuxtPlugin(() => {
  const { token, setToken } = useTokenStore();
  const config = useRuntimeConfig();
  const headers = useRequestHeaders(['cookie', 'user-agent']);
  const event = useRequestEvent();
  const retryStatusCodes = [401, 406];
  let retryCount = 0;

  const $fetchSecure = $fetch.create({
    baseURL: `${config.public.BASE_URL}/api`,
    retry: 2,
    retryDelay: 250,
    retryStatusCodes,
    credentials: 'include',

    onRequest: ({ options }) => {
      if (token) {
        options.headers = options.headers || {};
        options.headers.set('Authorization', `Bearer ${token.value}`);
      }
    },
    onResponse: ({ response }) => {
      const accessToken = response._data.accessToken;

      if (accessToken) {
        setToken(accessToken);
      }

      return response._data;
    },
    onResponseError: async ({ response }) => {
      if (!retryStatusCodes.includes(response.status)) {
        return;
      }

      try {
        const res = await $fetch.raw<{ accessToken: string }>(`${config.public.API}/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
          headers: headers ? headers : {},
        });

        if (res._data) {
          setToken(res._data.accessToken);
        }

        const cookies = res.headers.getSetCookie();

        if (cookies) {
          for (const cookie of cookies) {
            appendResponseHeader(event!, 'set-cookie', cookie);
          }
        }
      } catch (error) {
        retryCount++;

        if (retryCount === 3) {
          retryCount = 0;

          useNuxtApp().runWithContext(() => navigateTo('/dashboard', { redirectCode: 301 }));
        }
      }
    },
  });

  return {
    provide: {
      fetchSecure: $fetchSecure,
    },
  };
});
