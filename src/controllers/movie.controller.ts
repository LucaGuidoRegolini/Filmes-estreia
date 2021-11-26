import fs from "fs";
import path from "path";
import { Request, Response } from "express";
import { getRepository } from "typeorm";

import movieView from "../views/movie.view";

import { Movies } from "../models/Movies";
import { Images } from "../models/Image";

export default {
  async listAllMovie(req: Request, res: Response) {
    const moviesRep = getRepository(Movies);

    const movies = await moviesRep.find({ where: { cinema: req.cinemaId } });

    return res.status(200).json(movieView.renderMany(movies));
  },

  async getAnyMovie(req: Request, res: Response) {
    const moviesRep = getRepository(Movies);

    const movie = (await moviesRep.findOne({ where: { cinema: req.cinemaId, id: req.params.id, blocked: false } })) as Movies;

    return res.status(200).json(movieView.render(movie));
  },

  async listMovie(req: Request, res: Response) {
    const moviesRep = getRepository(Movies);

    const movies = await moviesRep.find({ where: { blocked: 0 } });

    return res.status(200).json(movieView.renderMany(movies));
  },

  async getMovie(req: Request, res: Response) {
    const moviesRep = getRepository(Movies);

    const movie = (await moviesRep.findOne({ where: { id: req.params.id, blocked: 0 } })) as Movies;

    return res.status(200).json(movieView.render(movie));
  },

  async blockMovie(req: Request, res: Response) {
    const moviesRep = getRepository(Movies);

    const movie = (await moviesRep.findOne({ where: { cinema: req.cinemaId, id: req.params.id } })) as Movies;
    movie.blocked = !movie.blocked;

    await moviesRep.save(movie);

    return res.status(201).json(movie);
  },

  async createMovie(req: Request, res: Response) {
    const moviesRep = getRepository(Movies);
    const imagessRep = getRepository(Images);

    req.body.cinema = req.cinemaId;
    const movie = await moviesRep.save(req.body);

    const requestImages = req.files as Express.Multer.File[];

    let images = [];
    for (const image in requestImages) {
      await imagessRep.save({ path: requestImages[image].filename, movie: movie.id });
      images.push({ path: requestImages[image] });
    }

    return res.status(201).json({ movie, images });
  },

  async deletemovie(req: Request, res: Response) {
    const moviesRep = getRepository(Movies);
    const imagessRep = getRepository(Images);

    const movie = (await moviesRep.findOne({
      where: { cinema: req.cinemaId, id: req.params.id },
    })) as Movies;

    const images = (await imagessRep.find({ where: { movie: movie.id } })) as Images[];
    await imagessRep.remove(images);

    for (const image in images) {
      fs.unlink(path.join(__dirname, "..", "..", "uploads", `${images[image].path}`), () => {});
    }

    await moviesRep.remove(movie);
    return res.status(204).send();
  },
};
