import promiseRouter from "express-promise-router";
import httpStatus from "http-status";

const router = promiseRouter();

router.route("/todos").get((_, res) => {
  return res
    .status(httpStatus.OK)
    .send([
      {
        description: "todo description",
        id: 0,
        title: "Todo",
      },
      {
        description: "todo description",
        id: 1,
        title: "Todo 1",
      },
      {
        description: "todo description",
        id: 2,
        title: "Todo 2",
      },
      {
        description: "todo description",
        id: 3,
        title: "Todo 3",
      },
    ])
    .end();
});

router.route("/todos/:id").get((_, res) => {
  return res
    .status(httpStatus.OK)
    .send({
      createdAt: new Date(),
      descritpion: "todo description",
      id: 3,
      rank: "high",
      title: "Todo 3",
      updatedAt: new Date(),
    })
    .end();
});

export default router;
