import { RouteObject } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { TodoPage } from "../pages/todo";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    errorElement: null,
    children: [
      {
        index: true,
        element: <TodoPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
