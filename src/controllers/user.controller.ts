import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { Users } from "../models/Users";
import { Cinemas } from "../models/Cinemas";

import tokenService from "../services/token.service";
import { InvalidArgumentError } from "../errors";

export default {
  // async createUser(req: Request, res: Response) {
  //   const userRep = getRepository(Users);
  //   const cinemasRep = getRepository(Cinemas);
  //   req.body.permission = await permissionRep.save(req.body.permission);
  //   const user = userRep.create(req.body);
  //   await userRep.save(user);
  //   return res.status(201).json(user);
  // },

  async loginUser(req: Request, res: Response) {
    let token;
    if (req.userId && req.userRole && req.cinemaId) {
      token = tokenService.generateJwt(req.userId, req.userRole, req.cinemaId);
      return res.status(200).json({ token });
    } else throw new InvalidArgumentError("User not found");
  },
};
