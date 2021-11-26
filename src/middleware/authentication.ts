import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { UnauthorizedError, notFound } from "../errors";
import { Users } from "../models/Users";

const { SECRET } = process.env;

export default {
  async local(req: Request, res: Response, next: NextFunction) {
    const userRep = getRepository(Users);

    const user = await userRep.findOne({
      where: { email: req.body.email },
      select: ["id", "password", "role"],
    });

    if (user) {
      const valid = await bcrypt.compare(req.body.password, user.password);
      if (valid) {
        req.userId = user.id;
        req.userRole = user.role;
        req.cinemaId = user.cinema.id;
        req.authenticated = true;
        return next();
      } else throw new UnauthorizedError("Invalid User");
    }else throw new notFound("User not found");
  },

  async bearer(req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization && SECRET) {
      const authorization = req.headers.authorization.replace("Bearer ", "");

      const decoded = jwt.verify(authorization, SECRET);

      if (decoded && typeof decoded !== "string") {
        req.userId = decoded.id;
        req.cinemaId = decoded.cinemaId;
        req.userRole = decoded.role;
        req.authenticated = true;

        return next();
      }
    }

    throw new UnauthorizedError("Invalid User");
  },
};
