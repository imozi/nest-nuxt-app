export interface Material extends Entity {
  name: string;
  slug: string | null;
  date: string;
  description: string | null;
  text: string | null;
  page: MaterialPage | null;
  menuItem: MenuItem | null;
  tags: Tags[];
  isPublished: boolean;
  resources: {
    type: string;
    name: string;
    url: string;
    originalName: string;
    extention: string;
    size: string;
    text?: string | undefined;
    description?: string | undefined;
  }[];
}

type MaterialPage = Omit<Page, 'menuItem'>;

export interface MaterialSingle extends Omit<Material, 'menuItem' | 'page'> {
  menuItemId: string | null;
  pageId: string | null;
}
