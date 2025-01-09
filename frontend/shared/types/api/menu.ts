export interface MenuItem extends Entity {
  name: string;
  slug: string;
  description: string | null;
  order: number;
  pages: Page[];
  menu: Menu[];
}

export interface Menu extends Entity {
  name: string;
  children: MenuItem[];
}

interface Page extends Entity {
  name: string;
  slug: string;
}
