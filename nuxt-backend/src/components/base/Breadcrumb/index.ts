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
