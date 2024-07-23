import { Router } from "express";
import { ResourceController } from "./resource.controller";
import { ResourceService } from "../services/resource.service";

export class ResourceRoutes {
  static get routes(): Router {
    const router = Router();

    const resourceService = new ResourceService();
    const controller = new ResourceController(resourceService);

    router.post("/create-new-resource", controller.createNewResource);
    router.get("/all-resources", controller.findAllResources);

    return router;
  }
}
