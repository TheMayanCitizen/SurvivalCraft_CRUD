import { Player } from "../../data";
import { CustomError, RegisterPlayerDto } from "../../domain";
import { UserService } from "./user.service";

export class PlayerService {
  constructor(private readonly userService: UserService) {}

  async createPlayer(playerData: RegisterPlayerDto, userId: number) {
    const userPromise = this.userService.findOneUserById(userId);
    const playerPromise = this.findOnePlayerByName(playerData.name);

    const [userData, _] = await Promise.all([userPromise, playerPromise]);

    const player = new Player();
    player.user = userData;
    player.name = playerData.name.toLocaleLowerCase().trim();

    try {
      return await player.save();
    } catch (error) {
      console.log(error);

      throw CustomError.internalServer("Something went wrong");
    }
  }

  async findOnePlayer(id: number) {
    const player = await Player.findOne({
      where: {
        id,
      },
      relations: ["user", "clan_member", "clan_member.clan"],
      select: {
        user: {
          id: true,
          username: true,
          email: true,
        },
      },
    });

    if (!player) throw CustomError.notFound("Player not found hommie");

    return player;
  }

  async findOnePlayerByName(name: string) {
    const player = await Player.findOne({
      where: {
        name,
      },
    });

    if (player) {
      throw CustomError.notFound(`This name is not available`);
    }

    return player;
  }
}
