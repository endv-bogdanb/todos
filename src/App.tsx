import { FC, useEffect, useState } from "react";

interface ITodo {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export const App: FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    const ab = new AbortController();

    fetch("/api/todos", { signal: ab.signal })
      .then((response) => response.json())
      .then(setTodos)
      .catch(() => {
        // NOTE: ignore
      });

    return () => {
      ab.abort();
    };
  }, []);

  return (
    <ol>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ol>
  );
};
