import React from "react";
import ReactDOM from "react-dom/client";
import { RootProviders } from "./utils";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RootProviders />
  </React.StrictMode>
);
