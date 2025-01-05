export interface MenuItem extends Entity {
  name: string;
  slug: string;
  description: string | null;
  order: number;
}

export interface Menu extends Entity {
  name: string;
  children: MenuItem[];
}
