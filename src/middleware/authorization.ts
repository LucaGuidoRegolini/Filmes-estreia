import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";

import { Users } from "../models/Users";
import { notFound, UnauthorizedError } from "../errors";

import { roles, rolesInterface, permissionsInterface } from "./roles";

export default (permission: keyof permissionsInterface, expected: boolean) => async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.userId;
  const userRep = await getRepository(Users);

  const user = await userRep.findOne({ where: { id: userId } });

  if (user) {
    req.userRole = user.role;

    if (roles[user.role][permission] == expected) next();
    else throw new UnauthorizedError("user not authorized");
  } else throw new notFound("user not found");
};
