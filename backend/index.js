import http from "node:http";
import express from "express";

const app = express();

app.use(express.json());

app.use((req,res,next)=>{
  setTimeout(next, 1500)
})

app.get("/todos", (_, res) => {
  const todos = [{ id: 1, userId: 1, title: "Todo title", body: "Todo body" }];
  return res.json(todos).end();
});

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
