import express from "express";
import { faker } from "@faker-js/faker";

const getId = (function () {
  let id = 0;
  return () => ++id;
})();

const todos = Array.from({ length: 10 }).map((_) => ({
  id: getId(),
  userId: 1,
  title: faker.random.words(5),
  completed: faker.datatype.boolean(),
}));

export const router = express.Router();

router.get("/todos", (_, res) => {
  return res.json(todos).end();
});

router.post("/todos", (req, res) => {
  // TODO: add validation
  const { body: todo } = req;

  const id = getId();
  todos.push({ ...todo, id });

  const todoRecord = todos.find((todo) => todo.id === id);

  return res.status(200).json(todoRecord);
});

router.patch("/todos/:id/complete", (req, res) => {
  const { id = 0 } = req.params;

  const todoRecord = todos.find((todo) => todo.id == id);

  if (!todoRecord) {
    return res.status(404).json("Not found");
  }

  todoRecord.completed = true;

  return res.status(200).json(todoRecord);
});
