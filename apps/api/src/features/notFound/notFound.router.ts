import promiseRouter from "express-promise-router";
import httpStatus from "http-status";

export const router = promiseRouter();

router.use("*", (_, res) => {
  const status = httpStatus.NOT_FOUND;
  return res.status(status).send(httpStatus[`${status}_MESSAGE`]).end();
});

export default router;
