import { FC } from "react";
import { ITodoItem, TodoItem } from "./TodoItem";
import { ITodo } from "../../http";

export interface ITodoList extends Pick<ITodoItem, "onClick"> {
  todos: ITodo[];
}

export const TodoList: FC<ITodoList> = ({ todos, onClick }) => {
  return (
    <ol>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onClick={onClick} />
      ))}
    </ol>
  );
};
