export type BreadcrumbItem = {
  label: string;
  url: string;
  parent?: {
    slug: string;
    title: string;
    query?: string;
  };
};

export type BreadcrumbProps = {
  crumb?: BreadcrumbItem;
};

const isMathPatternPath = (pathA: string, pathB: string) => {
  const partsA = pathA.split('/');
  const partsB = pathB.split('/');

  if (partsA.length !== partsB.length) return false;

  const isMatch = partsA.every((part: string, i: number) => {
    return part === partsB[i] || part.startsWith(':');
  });

  return isMatch;
};

export const useBreadcrumbsStore = () => {
  const breadcrumbs = useState<BreadcrumbItem[] | null>('breadcrumbs', () => null);

  const getCrumbs = (currRoute: string): BreadcrumbItem[] => {
    const routes = useRouter().getRoutes();

    const HOMEPAGE = { label: '', url: '/' };

    if (currRoute === '') return [HOMEPAGE];

    const paths = getCrumbs(currRoute.slice(0, currRoute.lastIndexOf('/')));
    const founds = routes.filter((r) => isMathPatternPath(r.path, currRoute));
    const matchRoute = founds.length > 1 ? founds.find((r) => r.path === currRoute) : founds[0];

    return [
      ...paths,
      {
        label: (matchRoute?.meta?.breadcrumb || matchRoute?.name || matchRoute?.path || paths) as string,
        url: currRoute,
      },
    ];
  };

  const createCrumbs = (crumb?: BreadcrumbItem) => {
    const route = useRoute();
    const crumbs = getCrumbs(route.path);

    if (!crumb) {
      return (breadcrumbs.value = crumbs);
    }

    breadcrumbs.value = crumbs.map((item) => {
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
    createCrumbs,
  };
};
