import { Router } from "express";

import userController from "../controllers/user.controller";
import authentication from "../middleware/authentication";
import authorization from "../middleware/authorization";
import { userValidation } from "../validations";

const userRouter = Router();

userRouter.get("/me", authentication.bearer, userController.userMe);
userRouter.get("/", authentication.bearer, authorization("manage_users", true), userController.listUser);
userRouter.get("/:id", authentication.bearer, authorization("manage_users", true), userController.getUser);

userRouter.post("/login", authentication.local,userValidation.localLoginValidator, userController.loginUser);
userRouter.post("/", authentication.bearer,userValidation.createUserValidator, authorization("manage_users", true), userController.createUser);
userRouter.put("/:id", authentication.bearer,userValidation.updateUserValidator, authorization("manage_users", true), userController.updateUser);
userRouter.delete("/:id", authentication.bearer, authorization("manage_users", true), userController.deleteUser);

export default userRouter;
