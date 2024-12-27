import { createConfigForNuxt } from '@nuxt/eslint-config/flat';

export default createConfigForNuxt({
  features: {
    stylistic: {
      semi: true,
      quote: true,
      commaDangle: 'always-multiline',
      indent: 2,
      blockSpacing: true,
      arrowParens: true,
      braceStyle: '1tbs',
    },
  },
}).append({
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 6,
        },
        multiline: {
          max: 6,
        },
      },
    ],
  },
});
