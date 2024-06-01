import { Outlet, type RouteObject } from "react-router-dom";
import { Home } from "./Home.page";
export type * from "./Home.page";

export const homeRoutes: RouteObject = {
  children: [
    {
      element: <Home />,
      index: true,
    },
  ],
  element: <Outlet />,
  path: "/",
};
