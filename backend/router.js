import util from "node:util";
import express from "express";
import { faker } from "@faker-js/faker";

const getId = (function () {
  let id = 0;
  return () => ++id;
})();

const ranks = ["high", "medium", "low"];

class Todo {
  constructor() {
    this.id = getId();
    this.userId = 1;
    this.title = faker.commerce.productMaterial();
    this.completed = faker.datatype.boolean();
    this.createdAt = faker.datatype.datetime();
    this.rank = ranks[~~(Math.random() * 3)];
  }

  complete = () => {
    this.completed = true;
  };

  toJson() {
    return this;
  }

  [util.inspect.custom]() {
    return JSON.stringify(this, null, 2);
  }

  toString() {
    return JSON.stringify(this);
  }

  valueOf() {
    const index = ranks.indexOf(this.rank);
    if (this.completed) {
      return index + 3;
    }
    return index;
  }

  equals(other) {
    return this.id === other.id;
  }
}

const todos = Array.from({ length: 10 }).map((_) => new Todo({}));

export const router = express.Router();

router.get("/todos", (_, res) => {
  return res.json([...todos].sort((a, b) => a - b)).end();
});

router.post("/todos", (req, res) => {
  // TODO: add validation
  const { body } = req;

  const todo = new Todo();
  todo.title = body.title;
  todo.completed = body.completed;
  todo.rank = body.rank;

  todos.push(todo);

  const todoRecord = todos.find(({ id }) => todo.id === id);

  return res.status(200).json(todoRecord);
});

router.patch("/todos/:id/complete", (req, res) => {
  const { id = 0 } = req.params;

  const todoRecord = todos.find((todo) => todo.id == id);

  if (!todoRecord) {
    return res.status(404).json("Not found");
  }

  todoRecord.complete();

  return res.status(200).json(todoRecord);
});
