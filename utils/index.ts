import { NextRequest } from "next/server";

export const checkContentType = (req: NextRequest): boolean => {
  return req.headers.get("content-type") === "application/json" ? true : false;
};

type Pagination = {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
  nextPage?: number;
  prevPage?: number;
};
export const generatePagination = (
  page: number,
  limit: number,
  totalPages: number,
  totalItems: number
) => {
  const pagination: Pagination = {
    page,
    limit,
    totalPages,
    totalItems,
  };

  if (page < totalPages) {
    pagination.nextPage = page + 1;
  }

  if (page > 1) {
    pagination.prevPage = page - 1;
  }

  return pagination;
};
