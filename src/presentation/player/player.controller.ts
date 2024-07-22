import { Request, Response } from "express";
import {
  AddItemToIventory,
  CustomError,
  RegisterPlayerDto,
} from "../../domain";
import { PlayerService } from "../services/player.service";
import { InventoryService } from "../services/inventory.service";

export class PlayerController {
  constructor(
    private readonly playerService: PlayerService,
    private readonly inventoryService: InventoryService
  ) {}

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
  addItemToInventory = async (req: Request, res: Response) => {
    const { id: playerId } = req.params;
    const [error, addItemToIventoryDTO] = AddItemToIventory.create(req.body);
    if (error) return res.status(422).json({ message: error });

    this.inventoryService
      .addItemToInventory(+playerId, addItemToIventoryDTO!)
      .then((resp) => res.status(200).json(resp))
      .catch((error) => this.handleError(error, res));
  };
}
