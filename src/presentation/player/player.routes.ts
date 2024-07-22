import { Router } from "express";
import { PlayerController } from "./player.controller";
import { PlayerService } from "../services/player.service";
import { UserService } from "../services/user.service";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { InventoryService } from "../services/inventory.service";
import { ItemService } from "../services/item.service";
import { ResourceService } from "../services/resource.service";

export class PlayerRoutes {
  static get routes(): Router {
    const router = Router();

    const userService = new UserService();
    const itemService = new ItemService();
    const resourceService = new ResourceService();
    const inventoryService = new InventoryService(itemService, resourceService);
    const playerService = new PlayerService(userService);
    const controller = new PlayerController(playerService, inventoryService);

    router.use(AuthMiddleware.protect);
    router.get("/:id", controller.findOnePlayer);
    router.get("/:id/inventory", controller.getPlayerInventory);
    router.get("/:id/quests", controller.findAllQuestByPlayerId);
    router.post("/", controller.createPlayer);
    router.post("/:id/inventory/items", controller.addItemToInventory);

    return router;
  }
}
