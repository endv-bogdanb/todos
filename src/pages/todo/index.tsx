import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { HttpTodo } from "../../domains/todo/http";
import { HttpError } from "../../utils";
import { Error } from "../../components";

export const TodoPage: FC = () => {
  const {
    data: todos = [],
    error,
    refetch,
    ...state
  } = useQuery({
    queryFn: HttpTodo.todos,
    queryKey: HttpTodo.todos.queryKey(),
    onError: (error: HttpError) => error,
  });

  if (state.isLoading) {
    return <progress></progress>;
  }

  if (state.isError) {
    return <Error error={error} retry={refetch} />;
  }

  return (
    <>
      <ol>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ol>
    </>
  );
};
