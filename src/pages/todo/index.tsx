import { FC, useCallback, MouseEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { HttpTodo, ITodo } from "../../domains/todo/http";
import { HttpError } from "../../utils";
import { Error, Loading } from "../../components";
import { TodoForm, TodoList } from "../../domains/todo";

export const TodoPage: FC = () => {
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

  return (
    <>
      <TodoForm />
      <TodoList todos={todos} onClick={onTodoClick} />
    </>
  );
};
