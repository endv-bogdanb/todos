import { Outlet, type RouteObject } from "react-router-dom";
import { Todos } from "./Todos.page";
export type * from "./Todos.page";

export const todoRoutes: RouteObject = {
  children: [
    {
      element: <Todos />,
      index: true,
    },
  ],
  element: <Outlet />,
  path: "/todos",
};
