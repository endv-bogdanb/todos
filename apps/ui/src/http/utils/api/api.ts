import { type Static, type TSchema } from "@sinclair/typebox";
import { Value, type ValueError } from "@sinclair/typebox/value";
import { HttpError, ParseError, ValidationError } from "@/utils";
import { call, type CallRequestInit, parse } from "./api.business";

interface Api {
  <T>(input: string | URL | Request, init: CallRequestInit): Promise<T>;
  <T extends TSchema>(
    input: string | URL | Request,
    init: CallRequestInit,
    schema?: T,
  ): Promise<Static<T>>;
}

const VALIDATION_STATUS = 422;

export const api: Api = async (
  input: string | URL | Request,
  init: CallRequestInit,
  schema?: TSchema,
) => {
  const response = await call(input, init);
  const value = await parse(response);

  if (!response.ok && response.status === VALIDATION_STATUS)
    throw new ValidationError(
      response,
      (value as { errors: ValueError[] }).errors,
    );

  if (!response.ok) throw new HttpError(response);

  if (schema && !Value.Check(schema, value))
    throw new ParseError(response, [...Value.Errors(schema, value)]);

  return value;
};
