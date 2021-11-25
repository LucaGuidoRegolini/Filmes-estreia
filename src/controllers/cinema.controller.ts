import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { Users } from "../models/Users";
import { Cinemas } from "../models/Cinemas";

export default {
  async createCinema(req: Request, res: Response) {
    const userRep = getRepository(Users);
    const cinemasRep = getRepository(Cinemas);

    const cinema = await cinemasRep.save(req.body.cinema);

    req.body.user.cinema = cinema.id;
    req.body.user.role = "admin";
    const user = await userRep.save(req.body.user);

    return res.status(201).json({
      cinema,
      user,
    });
  },
};
