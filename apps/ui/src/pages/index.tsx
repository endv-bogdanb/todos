import { createBrowserRouter, type RouteObject } from "react-router-dom";
import { homeRoutes } from "./home";
import { NavLayout } from "./Nav.layout";
import { todoRoutes } from "./todos";

export type * from "./home";
export type * from "./todos";

const routes: RouteObject[] = [
  {
    children: [homeRoutes, todoRoutes],
    element: <NavLayout />,
    path: "/",
  },
];

export const router = createBrowserRouter(routes);
