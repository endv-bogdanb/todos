/* eslint-disable max-classes-per-file */

import { type FieldPath, type FieldValues } from "react-hook-form";
import { type ValueError } from "@sinclair/typebox/value";
import { translateErrorFunction } from "../translations";

const ERROR_TYPES = [
  "API_ERROR",
  "HTTP_ERROR",
  "PARSE_ERROR",
  "VALIDATION_ERROR",
] as const;

export class ApiError extends Error {
  public readonly type: (typeof ERROR_TYPES)[number];
  public readonly status: number;
  public readonly statusText: string;
  public readonly url: string;

  constructor(
    message: string,
    response: Response,
    type: ApiError["type"] = "API_ERROR",
  ) {
    super(message);

    this.type = type;
    this.status = response.status;
    this.statusText = response.statusText;
    this.url = response.url;
  }

  public static is(error: unknown): error is ApiError {
    return error instanceof ApiError;
  }
}

export class HttpError extends ApiError {
  constructor(response: Response) {
    super("Http error", response, "HTTP_ERROR");
  }

  public static override is(error: unknown): error is HttpError {
    return error instanceof HttpError;
  }
}

export class ParseError extends ApiError {
  public readonly parseErrors: ValueError[];

  constructor(response: Response, parseErrors: ValueError[]) {
    super("Parse error", response, "PARSE_ERROR");
    this.parseErrors = parseErrors;
  }

  public static override is(error: unknown): error is ParseError {
    return error instanceof ParseError;
  }
}

export class ValidationError extends ApiError {
  public readonly errors: ValueError[];

  constructor(response: Response, errors: ValueError[]) {
    super("Validation error", response, "VALIDATION_ERROR");
    this.errors = errors;
  }

  public toFormErrors = <TFieldValues extends FieldValues>(
    callback: (
      path: FieldPath<TFieldValues> | `root.${string}` | "root",
      message: string,
    ) => void,
  ) => {
    this.errors.forEach((error) => {
      const SUBSTRING_START_AT = 1;
      const message = translateErrorFunction({
        ...error,
        errorType: error.type,
      });
      const path = error.path
        .substring(SUBSTRING_START_AT)
        .replace("/", "/") as
        | FieldPath<TFieldValues>
        | `root.${string}`
        | "root";

      callback(path, message);
    });
  };

  public static override is(error: unknown): error is ValidationError {
    return error instanceof ValidationError;
  }
}
