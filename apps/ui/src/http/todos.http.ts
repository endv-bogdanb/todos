import { type QueryFunctionContext } from "@tanstack/react-query";
import { api } from "./utils";

export async function todos(ctx: QueryFunctionContext<typeof todos.queryKey>) {
  return api<{ name: string }[]>("/api/todos", { signal: ctx.signal });
}

todos.queryKey = ["todos"] as const;
