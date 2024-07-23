import { Router } from "express";
import { ConstructionController } from "./construction.controller";
import { ConstructionService } from "../services/construction.service";

export class ConstructionRoutes {
  static get routes(): Router {
    const router = Router();

    const constructionService = new ConstructionService();
    const controller = new ConstructionController(constructionService);

    router.post("/create-construction", controller.createNewConstruction);

    return router;
  }
}
