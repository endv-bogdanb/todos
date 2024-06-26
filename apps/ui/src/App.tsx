import "./translations";
import { type FC, StrictMode } from "react";
import { RouterProvider } from "react-router-dom";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { router } from "@/pages";
import { ParseError } from "./utils";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (count, error) => {
        const MAX_RETRIES = 3;
        return count < MAX_RETRIES && !ParseError.is(error);
      },
    },
  },
  queryCache: new QueryCache({}),
});

export const App: FC = () => (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
