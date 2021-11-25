import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { Users } from "../models/Users";
import { Cinemas } from "../models/Cinemas";

export default {
  // async createUser(req: Request, res: Response) {
  //   const userRep = getRepository(Users);
  //   const cinemasRep = getRepository(Cinemas);
  //   req.body.permission = await permissionRep.save(req.body.permission);
  //   const user = userRep.create(req.body);
  //   await userRep.save(user);
  //   return res.status(201).json(user);
  // },
};
