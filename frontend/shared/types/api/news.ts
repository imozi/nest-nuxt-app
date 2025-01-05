import type { Entity } from '.';

export interface News extends Entity {
  slug: string;
  title: string;
  description: string;
  text: string;
  date: string;
  image: string;
  isPublished: boolean;
  menuItemId: string;
  createdAt: string;
  updatedAt: string;
}
