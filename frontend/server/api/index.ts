export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  return proxyRequest(event, config.public.API);
});
