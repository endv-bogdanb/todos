import promiseRouter from "express-promise-router";
import { Type } from "@sinclair/typebox";
import httpStatus from "http-status";
import { db } from "@/database";
import { validate } from "@/middlewares";

const router = promiseRouter();

router
  .route("/todos")
  .get(async (_, res) => {
    const todos = await db
      .selectFrom("todo")
      .select(["id", "description", "title"])
      .execute();

    return res.status(httpStatus.OK).json(todos).end();
  })
  .post(
    validate({
      body: Type.Object({
        description: Type.String(),
        rank: Type.Union([Type.Literal("low"), Type.Literal("high")]),
        title: Type.String(),
      }),
    }),
    async (req, res) => {
      await db.insertInto("todo").values(req.body).executeTakeFirstOrThrow();

      return res.status(httpStatus.OK).json({}).end();
    },
  );

router
  .route("/todos/:id")
  .get(
    validate({
      params: Type.Object({
        id: Type.Number(),
      }),
    }),
    async (req, res) => {
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

      return res.status(httpStatus.OK).json(todo).end();
    },
  )
  .put(async (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unused-vars
    const { createdAt: _, updatedAt: __, id: ___, ...body } = req.body;

    await db
      .updateTable("todo")
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      .set(body)
      .where("id", "=", Number(req.params.id))
      .executeTakeFirstOrThrow();

    return res.status(httpStatus.OK).json({}).end();
  });

export default router;
