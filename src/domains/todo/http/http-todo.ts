import { EnhanceHttpQueryKey, Http, queryKey } from "../../../utils";
import { ITodo } from "./http-todo.types";

class HttpTodo extends Http {
  @queryKey(() => ["todos"])
  public static todos = async (signal?: AbortSignal) => {
    const url = "/api/todos";

    return this.get<ITodo[]>({ url, signal });
  };

  @queryKey(() => ["todo_create"])
  public static create = async (
    todo: Pick<ITodo, "title" | "completed" | "rank">,
    signal?: AbortSignal
  ) => {
    const url = `/api/todos`;

    const body = { ...todo, userId: 1 };

    return this.post<ITodo>({ url, body });
  };

  @queryKey((todoId: number) => ["todo_complete", { todoId }])
  public static complete = async (todoId: number, signal?: AbortSignal) => {
    const url = `/api/todos/${todoId}/complete`;

    const body = { complete: true };

    return this.patch<ITodo>({ url, body });
  };
}

export default HttpTodo as unknown as EnhanceHttpQueryKey<typeof HttpTodo>;
