import { type FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryTodos } from "@/http";
import { TodosTable } from "./components/Todos.table";

export const TodosPage: FC = () => {
  const { data = [], isLoading } = useQuery({
    queryFn: queryTodos,
    queryKey: queryTodos.queryKey,
  });

  if (isLoading) {
    return <progress />;
  }

  return <TodosTable todos={data} />;
};
