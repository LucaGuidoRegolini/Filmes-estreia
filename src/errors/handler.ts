import { NextFunction, Request, Response } from "express";

function message(error: Error, message: string) {
  return { message, intance: error.constructor.name, error: error.message };
}

export default (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error.constructor.name == "QueryFailedError") return res.status(400).json(message(error, "Query error"));

  if (error.constructor.name == "UnauthorizedError") return res.status(401).json(message(error, "Unauthorized error"));

  return res.status(500).json(message(error, "Internal server error"));
};
