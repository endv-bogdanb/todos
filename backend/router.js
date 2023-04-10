import express from "express";
import { faker } from "@faker-js/faker";

const todos = Array.from({ length: 10 }).map((_, id) => ({
  id: id + 1,
  userId: 1,
  title: faker.random.words(5),
  completed: faker.datatype.boolean(),
}));

export const router = express.Router();

router.get("/todos", (_, res) => {
  return res.json(todos).end();
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
