import { Request, Response } from "express";
import { getRepository } from "typeorm";

import movieView from "../views/movie.view";

import { Movies } from "../models/Movies";
import { Images } from "../models/Image";

export default {
  async createMovie(req: Request, res: Response) {
    const moviesRep = getRepository(Movies);
    const imagessRep = getRepository(Images);

    req.body.cinema = req.cinemaId;
    const movie = await moviesRep.save(req.body);

    const requestImages = req.files as Express.Multer.File[];

    const images = requestImages.map((image) => {
      imagessRep.save({ path: image.filename, movie: movie.id });
      return { path: image.filename };
    });

    return res.status(201).json({ movie, images });
  },

  async listAllMovie(req: Request, res: Response) {
    const moviesRep = getRepository(Movies);

    const movies = await moviesRep.find({ where: { cinema: req.cinemaId } });

    return res.status(200).json(movieView.renderMany(movies));
  },
};
