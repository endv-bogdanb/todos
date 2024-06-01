import promiseRouter from "express-promise-router";
import httpStatus from "http-status";

const router = promiseRouter();

router.get("/health", (_, res) => {
  return res.status(httpStatus.OK).send("Server up and running ").end();
});

export default router;
