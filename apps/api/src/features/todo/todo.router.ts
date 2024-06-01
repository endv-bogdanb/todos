import promiseRouter from "express-promise-router";
import httpStatus from "http-status";

const router = promiseRouter();

router.get("/todos", (_, res) => {
  return res
    .status(httpStatus.OK)
    .send([
      {
        createdAt: new Date(),
        descritpion: "todo description",
        id: 0,
        name: "Todo",
        rank: "low",
        updatedAt: new Date(),
      },
      {
        createdAt: new Date(),
        descritpion: "todo description",
        id: 1,
        name: "Todo 1",
        rank: "low",
        updatedAt: new Date(),
      },
      {
        createdAt: new Date(),
        descritpion: "todo description",
        id: 2,
        name: "Todo 2",
        rank: "medium",
        updatedAt: new Date(),
      },
      {
        createdAt: new Date(),
        descritpion: "todo description",
        id: 3,
        name: "Todo 3",
        rank: "high",
        updatedAt: new Date(),
      },
    ])
    .end();
});

export default router;
