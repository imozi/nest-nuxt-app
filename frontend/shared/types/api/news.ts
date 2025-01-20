export interface News extends Entity {
  slug: string;
  title: string;
  description: string;
  text: string;
  date: string;
  image: string;
  isPublished: boolean;
  menuItemId: string;
  tags: Tags[];
  createdAt: string;
  updatedAt: string;
}
