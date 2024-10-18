import { joinURL } from 'ufo';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const path = event.path.replace(/^\/public\//, '');
  const target = joinURL(config.public.STORAGE, path);

  return proxyRequest(event, target);
});
