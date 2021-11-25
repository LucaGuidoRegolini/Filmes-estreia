import { Router } from "express";

import cinemaController from "../controllers/cinema.controller";
import authentication from "../middleware/authentication";

const cinemaRouter = Router();

cinemaRouter.post("/", cinemaController.createCinema);

export default cinemaRouter;
