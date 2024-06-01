import promiseRouter from "express-promise-router";
import httpStatus from "http-status";
import { db } from "@/database";

const router = promiseRouter();

router.route("/todos").get(async (_, res) => {
  const todos = await db
    .selectFrom("todo")
    .select(["id", "description", "title"])
    .execute();

  return res.status(httpStatus.OK).send(todos).end();
});

router.route("/todos/:id").get(async (req, res) => {
  const todo = await db
    .selectFrom("todo")
    .select([
      "id",
      "created_at as createdAt",
      "description",
      "rank",
      "title",
      "updated_at as updatedAt",
    ])
    .where("id", "=", Number(req.params.id))
    .executeTakeFirstOrThrow();

  return res.status(httpStatus.OK).send(todo).end();
});

export default router;
