import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack';

export const $fetchSecure = async <T>(
  url: NitroFetchRequest,
  options: NitroFetchOptions<
    NitroFetchRequest,
    'options' | 'get' | 'head' | 'patch' | 'post' | 'put' | 'delete' | 'connect' | 'trace'
  > = {},
) => {
  return await useNuxtApp().$fetchSecure<T>(url, options);
};
