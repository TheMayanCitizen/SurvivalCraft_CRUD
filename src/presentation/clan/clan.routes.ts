import { Router } from "express";
import { PlayerService } from "../services/player.service";
import { UserService } from "../services/user.service";
import { ClanService } from "../services/clan.service";
import { ClanController } from "./clan.controller";

export class ClanRoutes {
  static get routes(): Router {
    const router = Router();

    const userService = new UserService();
    const playerService = new PlayerService(userService);
    const clanService = new ClanService(playerService);
    const controller = new ClanController(clanService);

    router.post("/:playerReceiverId/join", controller.addMemberToClan);

    return router;
  }
}
