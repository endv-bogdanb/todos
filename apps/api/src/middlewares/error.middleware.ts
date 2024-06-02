import { type NextFunction, type Request, type Response } from "express";
import httpStatus from "http-status";

export const errorMiddleware = (
  _error: unknown,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
  // eslint-disable-next-line max-params
) => {
  console.log(_error)
  const status = httpStatus.INTERNAL_SERVER_ERROR;
  return res.status(status).send(httpStatus[`${status}_MESSAGE`]).end();
};
