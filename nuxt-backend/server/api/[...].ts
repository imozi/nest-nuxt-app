import { joinURL } from 'ufo';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const path = event.path.replace(/^\/api\//, '');
  const target = joinURL(config.public.API, path);

  return proxyRequest(event, target);
});
