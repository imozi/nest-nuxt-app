export const useBreadcrumbs = (crumb?: BreadcrumbItem) => {
  const { createCrumbs } = useBreadcrumbsStore();
  createCrumbs(crumb);
};
