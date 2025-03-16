import { ZodError } from "zod";

export type ValidationError = {
  field: string;
  message: string;
};

export const formatZodErrors = (error: ZodError): ValidationError[] => {
  return error.errors.map((err) => ({
    field: err.path[0] as string,
    message: err.message,
  }));
};
