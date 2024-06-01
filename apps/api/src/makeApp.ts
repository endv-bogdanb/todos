import express from "express";
import cookieParser from "cookie-parser";
import * as routes from "@/features";
import { errorMiddleware } from "@/middlewares";
import { notFoundRouter } from "./features/notFound/index.js";

export const makeApp = () => {
  const app = express();

  app.disable("x-powered-by");
  app.disable("etag");

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json({ limit: "2mb" }));
  app.use(cookieParser());

  Object.values(routes).forEach((route) => app.use("/api", route));

  app.use(errorMiddleware);
  app.use(notFoundRouter);

  return app;
};
