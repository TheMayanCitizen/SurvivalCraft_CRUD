import { Construction, Player } from "../../data";
import { CustomError } from "../../domain";
import { CreateConstructionDTO } from "../../domain/dtos/construction/create-construction.dto";
import { PlayerService } from "./player.service";
export class ConstructionService {
  constructor(private readonly playerService: PlayerService) {}

  async createConstruction(createConstructionDTO: CreateConstructionDTO) {
    const playerFromModel = await Player.findOne({
      where: {
        id: +createConstructionDTO.playerId,
      },
    });

    // const player = await this.playerService.findIfPlayerExist(
    //   createConstructionDTO.playerId
    // );
    // if (!player) throw CustomError.notFound("Player not found");
    if (!playerFromModel) throw CustomError.notFound("Player not found");
    // console.log(player);
    console.log(playerFromModel);

    const construction = new Construction();
    construction.name = createConstructionDTO.name;
    construction.type = createConstructionDTO.type;
    construction.location = createConstructionDTO.location;
    // construction.player = player;
    construction.player = playerFromModel;

    try {
      return await construction.save();
    } catch (error) {
      throw CustomError.internalServer("Something went very wrong! 🧨");
    }
  }

  async findAllConstructionsByPlayerId(player: Player) {
    const construction = await Construction.find({
      where: {
        player,
      },
    });

    if (!construction) throw CustomError.notFound("Construction not found");

    return construction;
  }
}
