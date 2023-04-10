import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { RootProviders } from "./utils";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RootProviders>
      <App />
    </RootProviders>
  </React.StrictMode>
);
