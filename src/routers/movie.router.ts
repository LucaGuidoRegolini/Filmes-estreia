import { Router } from "express";
import multer from "multer";

import movieController from "../controllers/movie.controller";
import authentication from "../middleware/authentication";
import uploadConfig from "../config/upload";
import authorization from "../middleware/authorization";

const movieRouter = Router();
const upload = multer(uploadConfig);

movieRouter.get("/all", authentication.bearer, movieController.listAllMovie);
movieRouter.get("/all/:id", authentication.bearer, movieController.getAnyMovie);

movieRouter.post("/", authentication.bearer, authorization("register_film", true), upload.array("images"), movieController.createMovie);
movieRouter.delete("/:id", authentication.bearer, authorization("register_film", true), movieController.deletemovie);

export default movieRouter;
