import { type Static, type TSchema } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import { HttpError, ParseError } from "@/utils";
import { call, type CallRequestInit, parse } from "./api.business";

interface Api {
  <T>(input: string | URL | Request, init: CallRequestInit): Promise<T>;
  <T extends TSchema>(
    input: string | URL | Request,
    init: CallRequestInit,
    schema?: T,
  ): Promise<Static<T>>;
}

export const api: Api = async (
  input: string | URL | Request,
  init: CallRequestInit,
  schema?: TSchema,
) => {
  const response = await call(input, init);
  const value = await parse(response);

  if (!response.ok) throw new HttpError(response);

  if (schema && !Value.Check(schema, value))
    throw new ParseError(response, [...Value.Errors(schema, value)]);

  return value;
};
