import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { Users } from "../models/Users";
import { Cinemas } from "../models/Cinemas";

import tokenService from "../services/token.service";
import { InvalidArgumentError } from "../errors";

export default {
  async loginUser(req: Request, res: Response) {
    let token;
    if (req.userId && req.userRole && req.cinemaId) {
      token = tokenService.generateJwt(req.userId, req.userRole, req.cinemaId);
      return res.status(200).json({ token });
    } else throw new InvalidArgumentError("User not found");
  },

  async createUser(req: Request, res: Response) {
    const userRep = getRepository(Users);

    req.body.cinema = req.cinemaId;
    const user = userRep.create(req.body);

    await userRep.save(user);
    return res.status(201).json(user);
  },

  async updateUser(req: Request, res: Response) {
    const userRep = getRepository(Users);
    const user = await userRep.findOne({ where: { id: req.params.id } });

    if (user) {
      userRep.merge(user, req.body);
      await userRep.save(user);
    } else throw new InvalidArgumentError("User not found");
    return res.status(201).json(user);
  },

  async deleteUser(req: Request, res: Response) {
    const userRep = getRepository(Users);

    const user = await userRep.findOne({
      where: { id: req.params.id },
    });

    if (user) {
      await userRep.delete(user);
      return res.status(204).send();
    } else throw new InvalidArgumentError("User not found");
  },
};
