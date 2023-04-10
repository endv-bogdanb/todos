import { EnhanceHttpQueryKey, Http, queryKey } from "../../../utils";
import { ITodo } from "./http-todo.types";

class HttpTodo extends Http {
  @queryKey(() => ["todos"])
  public static todos = async () => {
    const url = "/api/todos";
    return this.get<ITodo[]>({ url });
  };
}

export default HttpTodo as unknown as EnhanceHttpQueryKey<typeof HttpTodo>;
