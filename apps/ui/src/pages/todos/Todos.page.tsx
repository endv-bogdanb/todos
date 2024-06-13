import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { queryTodos } from "@/http";
import { TodosTable } from "./components";

export const TodosPage: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
          {t("create")}
        </button>
      </div>
      <TodosTable todos={data} />
    </>
  );
};
