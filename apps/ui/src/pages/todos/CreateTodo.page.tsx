import { type FC } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo, queryTodos } from "@/http";
import { TodosForm } from "./components";

export const CreateTodoPage: FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createTodo,
    mutationKey: createTodo.mutationKey,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryTodos.queryKey });
      // eslint-disable-next-line no-magic-numbers
      navigate(-1);
    },
  });

  return <TodosForm onSubmit={mutate} />;
};
