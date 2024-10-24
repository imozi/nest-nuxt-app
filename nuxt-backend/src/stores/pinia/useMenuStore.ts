export const useMenuStore = defineStore(
  'menu',
  () => {
    const menu = reactive({
      collapsed: false,
      list: [
        {
          id: useId(),
          name: 'Главная',
          to: '/home',
          icon: 'solar:home-angle-linear',
          crud: false,
        },
        {
          id: useId(),
          name: 'Обращения',
          to: '/contacting-support',
          icon: 'solar:inbox-unread-linear',
          crud: false,
        },
        {
          id: useId(),
          name: 'Новости',
          to: '/news',
          icon: 'solar:document-add-linear',
          crud: true,
        },
        {
          id: useId(),
          name: 'Материалы',
          to: '/materials',
          icon: 'solar:document-text-linear',
          crud: true,
        },
        {
          id: useId(),
          name: 'Файлы',
          to: '/files',
          icon: 'solar:folder-with-files-linear',
          crud: false,
        },
        {
          id: useId(),
          name: 'Меню',
          to: '/menu',
          icon: 'solar:menu-dots-square-linear',
          crud: false,
        },
        {
          id: useId(),
          name: 'Страницы',
          to: '/pages',
          icon: 'solar:book-linear',
          crud: true,
        },
      ],
    });

    return { menu };
  },
  {
    persist: {
      key: '_esed.global.state',
      pick: ['menu.collapsed'],
    },
  },
);
