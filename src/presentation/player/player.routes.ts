import { Router } from "express";
import { PlayerController } from "./player.controller";
import { PlayerService } from "../services/player.service";
import { UserService } from "../services/user.service";
import { AuthMiddleware } from "../../middlewares/auth.middleware";

export class PlayerRoutes {
  static get routes(): Router {
    const router = Router();

    const userService = new UserService();
    const playerService = new PlayerService(userService);
    const controller = new PlayerController(playerService);

    router.use(AuthMiddleware.protect);
    router.get("/:id", controller.findOnePlayer);
    router.post("/", controller.createPlayer);

    return router;
  }
}
