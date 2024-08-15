import { type NextFunction, type Request, type Response } from "express";
import httpStatus from "http-status";
import { ValidationError } from "../utils/error.util.js";

export const errorMiddleware = (
  _error: unknown,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
  // eslint-disable-next-line max-params
) => {
  if (_error instanceof ValidationError) {
    return res.status(_error.status).json({ errors: _error.errors });
  }

  const status = httpStatus.INTERNAL_SERVER_ERROR;
  return res.status(status).send(httpStatus[`${status}_MESSAGE`]).end();
};
