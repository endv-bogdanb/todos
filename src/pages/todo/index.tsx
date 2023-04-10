import { FC, useCallback, MouseEvent } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { HttpTodo, ITodo } from "../../domains/todo/http";
import { HttpError } from "../../utils";
import { Error, Loading } from "../../components";
import { TodoList } from "../../domains/todo";

export const TodoPage: FC = () => {
  const queryClient = useQueryClient();

  const {
    data: todos = [],
    error,
    refetch,
    ...state
  } = useQuery({
    queryFn: async ({ signal }) => HttpTodo.todos(signal),
    queryKey: HttpTodo.todos.queryKey(),
    onError: useCallback((error: HttpError) => error, []),
  });

  const onTodoClick = useCallback(
    (event: MouseEvent<HTMLLIElement>, todo: ITodo) => {
      if (todo.completed) {
        event.preventDefault();
      }
    },
    []
  );

  if (state.isLoading) {
    return <Loading />;
  }

  if (state.isError) {
    return <Error error={error} retry={refetch} />;
  }

  return <TodoList todos={todos} onClick={onTodoClick} />;
};
