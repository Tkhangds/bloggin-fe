type BloggingSuccessResponseWrapper<T = null> = {
  message: string;
  data: T;
};

type PaginationResponseWrapper<T = null> = BloggingSuccessResponseWrapper<T> & {
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    nextPage: number | null;
    prevPage: number | null;
  };
};

type BloggingErrorResponseWrapper = {
  message: string;
  statusCode: string;
  errors: string;
  path: string;
};
