import { Router } from "express";
import { UserService } from "../services/user.service";
import { UserController } from "./user.controller";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const userService = new UserService();
    const userController = new UserController(userService);

    router.get("/:id", userController.findOneUserById);
    router.post("/register", userController.register);
    router.post("/login", userController.login);

    return router;
  }
}
