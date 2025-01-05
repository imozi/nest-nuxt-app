export interface Entity {
  id: string;
}

export type ResponseError = {
  message: string;
  statusCode: number;
};

export type ResponeData<E> = {
  data: E[];
  meta: Meta;
};

export type Meta = {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: number | null;
  next: number | null;
};

export type QueryParams = {
  page?: number;
  limit?: number;
  search?: string;
};
