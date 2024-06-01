import { Outlet, type RouteObject } from "react-router-dom";
import { CreateTodoPage } from "./CreateTodo.page";
import { TodoPage } from "./Todo.page";
import { TodosPage } from "./Todos.page";
export type * from "./Todos.page";

export const todoRoutes: RouteObject = {
  children: [
    {
      element: <TodosPage />,
      index: true,
    },
    {
      element: <TodoPage />,
      path: ":id",
    },
    {
      element: <CreateTodoPage />,
      path: "create",
    },
  ],
  element: <Outlet />,
  path: "/todos",
};
