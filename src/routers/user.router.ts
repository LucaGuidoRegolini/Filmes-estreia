import { Router } from "express";

import userController from "../controllers/user.controller";
import authentication from "../middleware/authentication";

const userRouter = Router();

userRouter.post("/login", authentication.local, userController.loginUser);
userRouter.post("/", authentication.bearer, userController.createUser);
userRouter.put("/:id", authentication.bearer, userController.updateUser);
userRouter.delete("/:id", authentication.bearer, userController.deleteUser);

export default userRouter;
