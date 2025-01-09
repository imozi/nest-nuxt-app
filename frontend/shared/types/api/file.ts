export interface FileApi extends Entity {
  type: string;
  name: string;
  originalName: string;
  url: string;
  extention: string;
  size: string;
  createdAt: string;
  updatedAt: string;
}
