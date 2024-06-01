import { type Static, type TSchema } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import { errors } from "@/utils";
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

  if (!response.ok) errors.throw("HTTP", response);

  if (schema && !Value.Check(schema, value))
    errors.throw("PARSE", response, [...Value.Errors(schema, value)]);

  return value;
};
