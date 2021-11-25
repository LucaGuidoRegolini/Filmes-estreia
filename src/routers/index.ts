import { Router } from "express";

import userRouter from "./user.router";
import cinemaRouter from "./cinema.router";

const router = Router();

router.use("/users", userRouter);
router.use("/cinema", cinemaRouter);

export default router;
