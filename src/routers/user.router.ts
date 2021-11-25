import { Router } from "express";

import userController from "../controllers/user.controller";
import authentication from "../middleware/authentication";

const userRouter = Router();

userRouter.post("/login", authentication.local, userController.loginUser);

export default userRouter;
