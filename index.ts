import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import httpStatus from "http-status";
import solidityAnalyzer from "./solidityAnalyzer";
import ExtendedError from "./extendedError";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const host = process.env.HOST;

app.post("/analyze", (req: Request, res: Response) => {
  let code = req.query["code"];
  if (!code)
    throw new ExtendedError("code is required.", httpStatus.BAD_REQUEST);

  let response = solidityAnalyzer(code as string);

  res.send(response);
});

app.use(
  (
    err: Error | ExtendedError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (err.name !== "ExtendedError") {
      return next(new ExtendedError(err.message));
    }
    return next(err);
  }
);

app.use("/", (req: Request, res: Response, next: NextFunction) =>
  next(new ExtendedError("API not found", httpStatus.NOT_FOUND))
);

app.use(
  (err: ExtendedError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode).json({
      message: err.message,
    });
  }
);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://${host}:${port}`);
});
