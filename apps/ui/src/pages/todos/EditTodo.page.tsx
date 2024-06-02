import { type FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editTodo, queryTodo, queryTodos } from "@/http";
import { TodosForm } from "./components";

export const EditTodoPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data = null, isLoading } = useQuery({
    queryFn: queryTodo,
    queryKey: queryTodo.queryKey(Number(id)),
  });

  const { mutate } = useMutation({
    mutationFn: editTodo,
    mutationKey: editTodo.mutationKey,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryTodos.queryKey });
      // eslint-disable-next-line no-magic-numbers
      navigate(-1);
    },
  });

  if (isLoading) return null;

  return <TodosForm onSubmit={mutate} initialValues={data} />;
};
