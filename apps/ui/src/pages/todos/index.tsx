import { Outlet, type RouteObject } from "react-router-dom";
import { TodosPage } from "./Todos.page";
export type * from "./Todos.page";

export const todoRoutes: RouteObject = {
  children: [
    {
      element: <TodosPage />,
      index: true,
    },
  ],
  element: <Outlet />,
  path: "/todos",
};
