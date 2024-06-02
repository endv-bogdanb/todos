import { type Static, Type } from "@sinclair/typebox";
import { type QueryFunctionContext } from "@tanstack/react-query";
import { api } from "./utils";

const Todo = Type.Object({
  createdAt: Type.String(),
  description: Type.String(),
  id: Type.Number(),
  rank: Type.Union([Type.Literal("low"), Type.Literal("high")]),
  title: Type.String(),
  updatedAt: Type.String(),
});

export async function queryTodo({
  signal,
  queryKey,
}: QueryFunctionContext<ReturnType<typeof queryTodo.queryKey>>) {
  const [, { id }] = queryKey;
  return api(`/api/todos/${id}`, { signal }, Todo);
}

queryTodo.queryKey = (id: number) => ["todo", { id }] as const;

const Todos = Type.Array(Type.Pick(Todo, ["id", "description", "title"]));

export async function queryTodos({
  signal,
}: QueryFunctionContext<typeof queryTodos.queryKey>) {
  return api("/api/todos", { signal }, Todos);
}

queryTodos.queryKey = ["todos"] as const;

export async function createTodo(
  todo: Pick<Static<typeof Todo>, "title" | "description" | "rank">,
) {
  return api("/api/todos", {
    body: JSON.stringify(todo),
    method: "POST",
  });
}

createTodo.mutationKey = ["createTodo"] as const;

export async function editTodo(todo: Static<typeof Todo>) {
  return api(`/api/todos/${todo.id}`, {
    body: JSON.stringify(todo),
    method: "PUT",
  });
}

editTodo.mutationKey = ["editTodo"] as const;
