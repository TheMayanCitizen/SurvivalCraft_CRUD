import { Router } from "express";
import { ConstructionController } from "./construction.controller";
import { ConstructionService } from "../services/construction.service";
import { PlayerService } from "../services/player.service";
import { UserService } from "../services/user.service";

export class ConstructionRoutes {
  static get routes(): Router {
    const router = Router();

    const userService = new UserService();
    const playerService = new PlayerService(userService);
    const constructionService = new ConstructionService(playerService);
    const controller = new ConstructionController(constructionService);

    router.post("/create-construction", controller.createNewConstruction);

    return router;
  }
}
