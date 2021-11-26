import { Router } from "express";

import userRouter from "./user.router";
import cinemaRouter from "./cinema.router";
import movieRouter from "./movie.router";

const router = Router();

router.use("/users", userRouter);
router.use("/cinema", cinemaRouter);
router.use("/movie", movieRouter);

export default router;
