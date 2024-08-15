import { type ValueError } from "@sinclair/typebox/errors";
import httpStatus from "http-status";

export class ValidationError extends Error {
  constructor(
    public readonly errors: ValueError[],
    public readonly status = httpStatus.UNPROCESSABLE_ENTITY,
  ) {
    super(httpStatus[`${status}_MESSAGE`]);
  }
}
