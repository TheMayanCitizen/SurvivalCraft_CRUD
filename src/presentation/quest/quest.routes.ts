import { Router } from "express";
import { QuestService } from "../services/quest.service";
import { PlayerService } from "../services/player.service";
import { UserService } from "../services/user.service";
import { QuestController } from "./quest.controller";

export class QuestRoutes {
  static get routes(): Router {
    const router = Router();

    const userService = new UserService();
    const playerService = new PlayerService(userService);
    const questService = new QuestService(playerService);
    const controller = new QuestController(questService);

    router.post("/:playerId/assign", controller.addQuestToPlayer);

    return router;
  }
}

//TODO: Endpoint para completar una mission
/* 
Al completar la mission el estatus debe cambiar al completed true y se debe agregar la experiencia al jugador, ademas de agregar el item al inventario
*/
