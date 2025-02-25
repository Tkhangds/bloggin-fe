type PaginationResponseWrapper<T = null> = {
  totalItems: number;
  currentPage: number;
  nextPage: number | null;
  previousPage: number | null;
  totalPages: number;
  results: T[];
};

type BloggingSuccessResponseWrapper<T = null> = {
  success: boolean;
  message: string;
  data: T;
};
