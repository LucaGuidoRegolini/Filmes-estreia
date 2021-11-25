import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { Users } from "../models/Users";
import { Cinemas } from "../models/Cinemas";
import { InvalidArgumentError } from "../errors";

export default {
  async getCinema(req: Request, res: Response) {
    const cinemasRep = getRepository(Cinemas);
    const cinema = await cinemasRep.findOne({ where: { id: req.cinemaId } });
    return res.status(204).send();
  },

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

  async updateCinema(req: Request, res: Response) {
    const cinemasRep = getRepository(Cinemas);
    const cinema = await cinemasRep.findOne({ where: { id: req.params.id } });

    if (cinema) {
      cinemasRep.merge(cinema, req.body);
      await cinemasRep.save(cinema);
    } else throw new InvalidArgumentError("User not found");
    return res.status(201).json(cinema);
  },
};
