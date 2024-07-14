import { Router } from "express";
import { PlayerRoutes } from "./player/player.routes";
import { UserRoutes } from "./user/user.routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/v1/user", UserRoutes.routes);
    router.use("/api/v1/player", PlayerRoutes.routes);

    return router;
  }
}
