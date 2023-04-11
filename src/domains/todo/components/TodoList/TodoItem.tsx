import { FC, MouseEvent, useCallback } from "react";
import clsx from "clsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HttpTodo, ITodo } from "../../http";
import { HttpError } from "../../../../utils";
import classes from "./styles.module.css";

export interface ITodoItem {
  todo: ITodo;
  onClick?: (event: MouseEvent<HTMLLIElement>, todo: ITodo) => void;
}

export const TodoItem: FC<ITodoItem> = ({ todo, onClick }) => {
  const queryClient = useQueryClient();

  const completeTodo = useMutation({
    mutationFn: HttpTodo.complete,
    mutationKey: HttpTodo.complete.queryKey(todo.id),
    onMutate: async (todoId) => {
      const queryKey = HttpTodo.todos.queryKey();

      await queryClient.cancelQueries({ queryKey });

      const prevTodos = queryClient.getQueryData<ITodo[]>(queryKey);

      queryClient.setQueryData<ITodo[]>(queryKey, (old) =>
        old?.map((value) => {
          if (value.id === todoId) {
            return { ...value, completed: true };
          }
          return value;
        })
      );

      return { prevTodos };
    },
    onError: (error: HttpError, todoId, context) => {
      const queryKey = HttpTodo.todos.queryKey();
      queryClient.setQueriesData(queryKey, context?.prevTodos);

      return error;
    },
    onSettled: () => {
      const queryKey = HttpTodo.todos.queryKey();
      queryClient.invalidateQueries(queryKey);
    },
  });

  const handleOnClick = useCallback(
    (event: MouseEvent<HTMLLIElement>) => {
      onClick?.(event, todo);

      if (event.defaultPrevented) return;

      completeTodo.mutate(todo.id);
    },
    [todo, onClick]
  );

  return (
    <>
      <li
        className={clsx({ [`${classes.clickable}`]: !todo.completed })}
        onClick={handleOnClick}
      >
        {todo.completed ? <del>{todo.title}</del> : <span>{todo.title}</span>}
      </li>
    </>
  );
};
