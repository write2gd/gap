export interface Pagination {
  page: number;
  pageSize: number;
  numberOfPages?: number;
}

export interface Links {
  [key: string]: any;
}

export interface Response<T> {
  data: T;
  links?: Links;
  pagination?: Pagination;
}
