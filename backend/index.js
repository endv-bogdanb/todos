import http from "node:http";
import express from "express";
import { router } from "./router.js";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  setTimeout(next, 500);
});

app.use(router);

const server = new http.Server(app);

server.listen(3000);

server.on("listening", () =>
  console.log("Server app and running on port 3000")
);

server.on("error", (error) => {
  console.log("Server error");
  server.close((error) => {
    if (error) {
      console.log("Server close error ", error);
    }
    process.exit(1);
  });
});

console.log("hello world");
