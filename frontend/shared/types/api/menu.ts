export interface MenuItem extends Entity {
  name: string;
  slug: string;
  description: string | null;
  order: number;
  pages: Page[];
}

export interface Menu extends Entity {
  name: string;
  children: MenuItem[];
}

export interface Page extends Entity {
  name: string;
  slug: string;
}
