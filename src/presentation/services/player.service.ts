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

  async findOnePlayerQuests(id: number) {
    const player = await Player.findOne({
      where: {
        id,
      },
      relations: ["quest_players", "quest_players.quest"],
      select: {
        quest_players: {
          completed: true,
          quest: {
            name: true,
            description: true,
            reward: true,
            exp: true,
          },
        },
      },
    });

    if (!player) throw CustomError.notFound("Player not found hommie");

    if (player.quest_players.length === 0)
      throw CustomError.notFound("You have not quests hommie");

    const quests = player.quest_players;
    return quests;
  }

  async findIfPlayerExist(id: number) {
    const player = await Player.findOne({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        level: true,
        experience: true,
        health: true,
        energy: true,
      },
    });

    if (!player) throw CustomError.notFound("Player not found hommie");

    return player;
  }

  async findAllPlayerConstructions(id: number) {
    //Let's just make it work.
    const player = await Player.findOne({
      where: {
        id,
      },
      relations: ["construction"],
    });

    if (!player) throw CustomError.notFound("Player not found hommie");

    if (player.construction.length === 0)
      throw CustomError.notFound("You have not constructions hommie");

    const constructions = player.construction;
    return constructions;

    // const player = this.findIfPlayerExist(id);
    console.log(player);
  }
}
