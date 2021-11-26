import { Router } from "express";
import multer from "multer";

import movieController from "../controllers/movie.controller";
import authentication from "../middleware/authentication";
import uploadConfig from "../config/upload";

const movieRouter = Router();
const upload = multer(uploadConfig);

movieRouter.get("/all", authentication.bearer, movieController.listAllMovie);

movieRouter.post("/", authentication.bearer, upload.array("images"), movieController.createMovie);

export default movieRouter;
