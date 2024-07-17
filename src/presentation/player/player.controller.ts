import { Request, Response } from "express";
import { CustomError, RegisterPlayerDto } from "../../domain";
import { PlayerService } from "../services/player.service";

export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    console.log(error);
    return res.status(500).json({ message: "Something went very wrong! 🧨" });
  };

  createPlayer = async (req: Request, res: Response) => {
    const [error, createPlayerDto] = RegisterPlayerDto.create(req.body);

    if (error) return res.status(422).json({ message: error });

    const sessionUserId = req.body.sessionUser.id;
    this.playerService
      .createPlayer(createPlayerDto!, sessionUserId)
      .then((player) => res.status(201).json(player))
      .catch((error) => this.handleError(error, res));
  };
  findOnePlayer = async (req: Request, res: Response) => {
    const { id } = req.params;

    this.playerService
      .findOnePlayer(+id)
      .then((player) => res.status(200).json(player))
      .catch((error) => this.handleError(error, res));
  };
}
