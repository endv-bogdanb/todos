import { FC } from "react";
import { useForm } from "react-hook-form";
import { Checbox, Input, Submit } from "../../../components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HttpTodo, ITodo } from "../http";
import { HttpError } from "../../../utils";

export interface ITodoForm {}

interface TodoFormValues {
  title: string;
  completed: boolean;
}

export const TodoForm: FC<ITodoForm> = () => {
  const queryClient = useQueryClient();
  const { handleSubmit, control, reset } = useForm<TodoFormValues>();

  const createTodo = useMutation({
    mutationFn: HttpTodo.create,
    mutationKey: HttpTodo.create.queryKey(),
    onMutate: async (todo) => {
      const queryKey = HttpTodo.todos.queryKey();

      await queryClient.cancelQueries({ queryKey });

      const prevTodos = queryClient.getQueryData<ITodo[]>(queryKey);

      queryClient.setQueryData<ITodo[]>(queryKey, (old = []) => [
        { ...todo, id: Date.now(), userId: 1 },
        ...old,
      ]);

      return { prevTodos };
    },
    onError: (error: HttpError, todo, context) => {
      const queryKey = HttpTodo.todos.queryKey();
      queryClient.setQueriesData(queryKey, context?.prevTodos);

      return error;
    },
    onSuccess: () => {
      reset();
    },
    onSettled: () => {
      const queryKey = HttpTodo.todos.queryKey();
      queryClient.invalidateQueries(queryKey);
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        createTodo.mutate(data);
      })}
    >
      <Input label="Title" name="title" control={control} />
      <Checbox label="Completed" name="completed" control={control} />
      <Submit label="Add" control={control} disabled={createTodo.isLoading} />
    </form>
  );
};
