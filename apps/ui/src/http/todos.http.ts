import { Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import { type QueryFunctionContext } from "@tanstack/react-query";
import { api } from "./utils";

const Todos = Type.Array(
  Type.Object({
    id: Type.Number(),
    name: Type.String(),
  }),
);

export async function queryTodos(
  ctx: QueryFunctionContext<typeof queryTodos.queryKey>,
) {
  const response = await api("/api/todos", {
    signal: ctx.signal,
  });
  if (!Value.Check(Todos, response)) {
    throw new Error("Invalid response");
  }

  return response;
}

queryTodos.queryKey = ["todos"] as const;
