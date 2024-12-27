import type { NuxtError } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (...args) => {
    const error = args[0] as NuxtError;

    if (error.message) {
      return toast.error(error.message);
    }

    toast.error(`Ошибка в работе сервера`);
    clearError();
  };
});
