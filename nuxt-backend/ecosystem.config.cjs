module.exports = {
  apps: [
    {
      name: 'esed',
      port: '3000',
      script: './.output/server/index.mjs',
      watch: true,
      ignore_watch: ['node_modules'],
      autorestart: true,
    },
  ],
};
