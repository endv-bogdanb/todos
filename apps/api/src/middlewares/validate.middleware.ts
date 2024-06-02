import { type RequestHandler } from "express";
import { type Static, type TSchema } from "@sinclair/typebox";
import { Value, type ValueError } from "@sinclair/typebox/value";

export const validate =
  <
    TParams extends TSchema,
    TBody extends TSchema,
    TQuery extends TSchema,
  >(schema: {
    body?: TBody;
    params?: TParams;
    query?: TQuery;
  }): RequestHandler<Static<TParams>, unknown, Static<TBody>, Static<TQuery>> =>
  (req, _, next) => {
    const errors = Object.entries(schema).reduce<ValueError[]>(
      (current, [key, value]) => {
        const coereced = Value.Convert(value, req[key as keyof typeof schema]);
        const valueErrors = Value.Errors(value, coereced);

        req[key as keyof typeof schema] = coereced;

        return [...current, ...valueErrors];
      },
      [],
    );

    if (errors.length) {
      throw new Error("Validation error");
    }

    next();
  };
