import { Router } from "express";

import userController from "../controllers/user.controller";
import authentication from "../middleware/authentication";
import authorization from "../middleware/authorization";

const userRouter = Router();

userRouter.get("/me", authentication.bearer, userController.userMe);
userRouter.get("/", authentication.bearer, authorization("manage_users", true), userController.listUser);
userRouter.get("/:id", authentication.bearer, authorization("manage_users", true), userController.getUser);

userRouter.post("/login", authentication.local, userController.loginUser);
userRouter.post("/", authentication.bearer, authorization("manage_users", true), userController.createUser);
userRouter.put("/:id", authentication.bearer, authorization("manage_users", true), userController.updateUser);
userRouter.delete("/:id", authentication.bearer, authorization("manage_users", true), userController.deleteUser);

export default userRouter;
