export const useMenuStore = defineStore(
  'menu',
  () => {
    const menu = reactive({
      collapsed: false,
      list: [
        {
          id: useId(),
          name: 'Главная',
          to: '/dashboard/home',
          icon: 'solar:home-angle-linear',
          crud: false,
        },
        {
          id: useId(),
          name: 'Обращения',
          to: '/dashboard/contacting-support',
          icon: 'solar:inbox-unread-linear',
          crud: false,
        },
        {
          id: useId(),
          name: 'Новости',
          to: '/dashboard/news',
          icon: 'solar:document-add-linear',
          crud: true,
        },
        {
          id: useId(),
          name: 'Материалы',
          to: '/dashboard/materials',
          icon: 'solar:document-text-linear',
          crud: true,
        },
        {
          id: useId(),
          name: 'Страницы',
          to: '/dashboard/pages',
          icon: 'solar:book-linear',
          crud: true,
        },
        {
          id: useId(),
          name: 'Файлы',
          to: '/dashboard/files',
          icon: 'solar:folder-with-files-linear',
          crud: false,
        },
        {
          id: useId(),
          name: 'Меню',
          to: '/dashboard/menu',
          icon: 'solar:menu-dots-square-linear',
          crud: false,
        },
        {
          id: useId(),
          name: 'Теги',
          to: '/dashboard/tags',
          icon: 'solar:tag-linear',
          crud: false,
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
