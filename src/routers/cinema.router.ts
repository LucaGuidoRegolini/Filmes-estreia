import { Router } from "express";

import cinemaController from "../controllers/cinema.controller";
import authentication from "../middleware/authentication";
import authorization from "../middleware/authorization";
import { cinemaValidation } from "../validations";

const cinemaRouter = Router();

cinemaRouter.get("/", authentication.bearer, cinemaController.getCinema);

cinemaRouter.post("/",cinemaValidation.createCinemaValidator, cinemaController.createCinema);
cinemaRouter.put("/:id",authentication.bearer,cinemaValidation.updateCinemaValidator, authorization("manage_cinema", true),cinemaController.updateCinema);

export default cinemaRouter;
