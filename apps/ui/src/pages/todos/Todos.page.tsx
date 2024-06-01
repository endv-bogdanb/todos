import { type FC } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { queryTodos } from "@/http";
import { TodosTable } from "./components/Todos.table";

export const TodosPage: FC = () => {
  const navigate = useNavigate();
  const { data = [], isLoading } = useQuery({
    queryFn: queryTodos,
    queryKey: queryTodos.queryKey,
  });

  if (isLoading) {
    return <progress />;
  }

  return (
    <>
      <div>
        <button
          onClick={() => {
            navigate("create");
          }}
        >
          + create
        </button>
      </div>
      <TodosTable todos={data} />
    </>
  );
};
