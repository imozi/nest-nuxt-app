import { withBase } from 'ufo';

export default defineNuxtPlugin(() => {
  const head = injectHead();
  if (!head) {
    return;
  }
  const runtimeConfig = useRuntimeConfig();
  head.use({
    hooks: {
      'tags:resolve'(ctx) {
        for (const tag of ctx.tags) {
          if (tag.tag === 'link' && tag.props.rel === 'icon') {
            tag.props.href = withBase(tag.props.href, runtimeConfig.app.baseURL);
          }
        }
      },
    },
  });
});
