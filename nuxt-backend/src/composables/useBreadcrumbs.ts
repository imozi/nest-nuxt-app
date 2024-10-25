import type { BreadcrumbItem } from '~/components/base/Breadcrumb';

const isMathPatternPath = (pathA: string, pathB: string) => {
  const partsA = pathA.split('/');
  const partsB = pathB.split('/');

  if (partsA.length !== partsB.length) return false;

  const isMatch = partsA.every((part: string, i: number) => {
    return part === partsB[i] || part.startsWith(':');
  });

  return isMatch;
};

const getCrumbs = (currRoute: string): any[] => {
  const routes = useRouter().getRoutes();

  const HOMEPAGE = { label: 'Главная', url: '/home' };

  if (currRoute === '') return [HOMEPAGE];

  const paths = getCrumbs(currRoute.slice(0, currRoute.lastIndexOf('/')));
  const founds = routes.filter((r) => isMathPatternPath(r.path, currRoute));
  const matchRoute = founds.length > 1 ? founds.find((r) => r.path === currRoute) : founds[0];

  return [
    ...paths,
    {
      label: matchRoute?.meta?.breadcrumb || matchRoute?.name || matchRoute?.path || paths,
      url: currRoute,
    },
  ];
};

export const useBreadcrumbs = () => {
  const route = useRoute().path;
  const breadcrumbs = getCrumbs(route) as BreadcrumbItem[];

  const setDynamicCrumb = (crumb: BreadcrumbItem) => {
    breadcrumbs.forEach((item) => {
      if (crumb.parent && crumb.parent.slug === item.url.substring(item.url.lastIndexOf(crumb.parent.slug))) {
        item.label = crumb.parent.title;

        item.url = crumb.parent?.query ? item.url + `?${crumb.parent.query}` : item.url;
      }

      if (item.url === crumb.url) return Object.assign(item, crumb);

      return item;
    });
  };

  return {
    breadcrumbs,

    setDynamicCrumb,
  };
};
