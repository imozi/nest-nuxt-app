export interface Page extends Entity {
  name: string;
  slug: string;
  description: string;
  text: string;
  menuItem: { name: string };
  menuItemId: string;
  createdAt: string;
  updatedAt: string;
}
