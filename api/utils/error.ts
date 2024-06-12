interface Error {
  statusCode?: number;
  message?: string;
}

export const errorHandler = (statusCode: number, message: string) => {
  const error: Error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
