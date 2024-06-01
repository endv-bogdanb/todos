import { Server } from "node:http";
import { PORT } from "./env.js";
import { makeApp } from "./makeApp.js";

const app = makeApp();
const http = new Server(app);

http.listen(PORT);

http.on("error", () => {
  // eslint-disable-next-line no-console
  console.log("server failed to listen");
});
