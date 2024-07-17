import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../config";
import { User } from "../data";

export class AuthMiddleware {
  static async protect(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header("Authorization");
    if (!authorization)
      return res.status(401).json({ message: "No token provided" });

    if (!authorization.startsWith("Bearer "))
      return res.status(401).json({ message: "Invalid token" });

    const token = authorization.split(" ").at(1) || "";

    try {
      const payload = await JwtAdapter.validateToken<{ id: number }>(token);
      if (!payload) return res.status(401).json({ message: "Invalid token" });

      const user = await User.findOne({
        where: {
          id: payload.id,
        },
      });
      if (!user) return res.status(401).json({ message: "Invalid user" });

      req.body.sessionUser = user;
      next();
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong!" });
    }
  }
}
