import { Outlet, type RouteObject } from "react-router-dom";
import { CreateTodoPage } from "./CreateTodo.page";
import { EditTodoPage } from "./EditTodo.page";
import { TodoPage } from "./Todo.page";
import { TodosPage } from "./Todos.page";

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
    {
      element: <EditTodoPage />,
      path: "edit/:id",
    },
  ],
  element: <Outlet />,
  path: "/todos",
};
