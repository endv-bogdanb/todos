import { type FC } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { queryTodo } from "@/http";

export const TodoPage: FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useQuery({
    queryFn: queryTodo,
    queryKey: queryTodo.queryKey(Number(id)),
  });

  if (isLoading) {
    return <progress />;
  }

  return (
    <div>
      {Object.keys(data ?? {}).map((key) => (
        <div key={key}>
          <label>{key}:</label>
          &nbsp;
          <span>{data?.[key as unknown as keyof typeof data]}</span>
        </div>
      ))}
    </div>
  );
};
