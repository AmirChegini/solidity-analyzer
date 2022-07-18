import httpStatus from "http-status";

export default class ExtendedError extends Error {
  statusCode: number;
  constructor(message: string, statusCode?: number | undefined) {
    super(message);
    this.name = "ExtendedError";
    this.message = message;
    this.statusCode =
      statusCode !== undefined && statusCode !== null
        ? statusCode
        : httpStatus.INTERNAL_SERVER_ERROR;
  }
}
