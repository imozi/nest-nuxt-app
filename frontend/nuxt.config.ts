// https://nuxt.com/docs/api/configuration/nuxt-config
const isDev = process.env.NODE_ENV !== 'production';

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    'dayjs-nuxt',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@vee-validate/nuxt',
    '@formkit/auto-animate/nuxt',
    '@unlazy/nuxt',
    'nuxt-tiptap-editor',
  ],
  components: [
    {
      prefix: '',
      path: '@/components/shared',
      extensions: ['vue'],
    },
    {
      prefix: '',
      path: '@/components/widgets',
      extensions: ['vue'],
    },
    {
      prefix: '',
      path: '@/components/backend',
      extensions: ['vue'],
    },
  ],
  imports: {
    dirs: ['types', 'stores/**'],

    imports: [
      {
        from: 'class-variance-authority',
        name: 'cva',
      },
      {
        from: 'class-variance-authority',
        name: 'VariantProps',
        type: true,
      },
      {
        from: 'clsx',
        name: 'clsx',
      },
      {
        from: 'clsx',
        name: 'ClassValue',
        type: true,
      },
      {
        from: 'tailwind-merge',
        name: 'twMerge',
      },
      {
        from: 'tailwind-merge',
        name: 'twMerge',
      },
    ],
  },
  devtools: { enabled: true },
  app: {
    rootAttrs: {
      id: 'portal',
    },
    buildAssetsDir: isDev ? '/_nuxt/' : '/assets',
    head: {
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      htmlAttrs: {
        lang: 'ru',
      },
    },
  },
  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'light',
    globalName: '__ESED_COLOR_MODE__',
    storageKey: 'esed-color-mode',
  },
  runtimeConfig: {
    public: {
      STORAGE: isDev ? process.env.API_STORAGE_DEV : process.env.API_STORAGE_PROD,
      API: isDev ? process.env.API_URL_DEV : process.env.API_URL_PROD,
      BASE_URL: isDev ? process.env.BASE_URL_DEV : process.env.BASE_URL_PROD,
    },
  },
  srcDir: './src',
  serverDir: './server',
  devServer: {
    port: 3000,
  },
  future: {
    compatibilityVersion: 4,
  },
  features: {
    inlineStyles: false,
  },
  compatibilityDate: '2024-04-03',
  webpack: {
    optimizeCSS: {
      extractCSS: true,
    },
  },
  icon: {
    mode: 'svg',
  },
  pinia: {
    storesDirs: ['./src/stores/pinia/**'],
  },
  shadcn: {
    prefix: 'Ui',
    componentDir: './src/components/libs/shadcn/components',
  },
  tailwindcss: {
    viewer: false,
    exposeConfig: true,
    cssPath: '~/assets/scss/styles.scss',
  },
});
