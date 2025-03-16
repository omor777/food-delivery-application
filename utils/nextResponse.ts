import { NextResponse } from "next/server";

interface SuccessResponse<T> {
  message?: string;
  data?: T;
  success?: boolean;
}

export const successResponse = <T>(
  message: string,
  status: number,
  data?: T
) => {
  const response: SuccessResponse<T> = {
    success: true,
  };

  if (!!message) {
    response.message = message;
  }
  if (!!data) {
    response.data = data;
  }
  return NextResponse.json(response, { status });
};

export interface ErrorResponse<T> {
  message: string;
  success: boolean;
  data?: T;
}

export const errorResponse = <T>(message: string, status: number, data?: T) => {
  const response: ErrorResponse<T> = {
    success: false,
    message,
  };

  if (!!data) {
    response.data = data;
  }

  return NextResponse.json(response, { status });
};
