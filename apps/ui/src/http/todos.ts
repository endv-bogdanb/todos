import { Type } from "@sinclair/typebox";
import { type QueryFunctionContext } from "@tanstack/react-query";
import { api } from "./utils";

const Todo = Type.Object({
  createdAt: Type.Date(),
  description: Type.String(),
  id: Type.Number(),
  rank: Type.Union([Type.Literal("low"), Type.Literal("high")]),
  title: Type.String(),
  updatedAt: Type.Date(),
});

export async function queryTodo({
  signal,
  queryKey,
}: QueryFunctionContext<ReturnType<typeof queryTodo.queryKey>>) {
  // eslint-disable-next-line no-magic-numbers
  return api(`/api/todos/${queryKey[1].id}`, { signal }, Todo);
}

queryTodo.queryKey = (id: number) => ["todo", { id }] as const;

const Todos = Type.Array(Type.Pick(Todo, ["id", "description", "title"]));

export async function queryTodos({
  signal,
}: QueryFunctionContext<typeof queryTodos.queryKey>) {
  return api("/api/todos", { signal }, Todos);
}

queryTodos.queryKey = ["todos"] as const;
