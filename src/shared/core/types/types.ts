export type ReturnTypeMeta<T> = {
  data: T;
  meta: {
    total: number;
    currentPage: number;
    lastPage: number;
    perPage: number;
    prev: number;
    next: number;
  };
};
