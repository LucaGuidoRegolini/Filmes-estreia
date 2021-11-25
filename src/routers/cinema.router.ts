import { Router } from "express";

import cinemaController from "../controllers/cinema.controller";
import authentication from "../middleware/authentication";

const cinemaRouter = Router();

cinemaRouter.get("/", authentication.bearer, cinemaController.createCinema);

cinemaRouter.post("/", cinemaController.createCinema);
cinemaRouter.put("/:id", cinemaController.updateCinema);

export default cinemaRouter;
