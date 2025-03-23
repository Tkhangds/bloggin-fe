type SuccessResponseWrapper<T = null> = {
  message: string;
  data: T;
};

type PaginationResponseWrapper<T = null> = SuccessResponseWrapper<T> & {
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    nextPage: number | null;
    prevPage: number | null;
  };
};

type ErrorResponseWrapper = {
  message: string;
  statusCode: string;
  errors: string;
  path: string;
};
