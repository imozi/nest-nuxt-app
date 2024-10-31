export type { Account } from './api/Account';
export type { User } from './api/User';
export type { Role } from './api/Role';
export type { Gender } from './api/Gender';
export type { FileApi } from './api/File';
export type { ResponseError } from './api/ResponseError';

export type Meta = {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: number | null;
  next: number | null;
};

export type ResponeWithMeta<T> = {
  data: T[];
  meta: Meta;
};

export type QueryParams = {
  page?: number;
  limit?: number;
  search?: string;
};
