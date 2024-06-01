import {
  createBrowserRouter,
  Outlet,
  type RouteObject,
} from "react-router-dom";
import { homeRoutes } from "./home";
import { todoRoutes } from "./todos";

export type * from "./home";
export type * from "./todos";

const routes: RouteObject[] = [
  {
    children: [homeRoutes, todoRoutes],
    element: <Outlet />,
    path: "/",
  },
];

export const router = createBrowserRouter(routes);
