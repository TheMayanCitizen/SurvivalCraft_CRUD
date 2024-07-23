import { Quest, Quest_Player } from "../../data";
import { AddQuestPlayerDTO, CustomError } from "../../domain";
import { PlayerService } from "./player.service";
import { CreateQuestDTO } from "../../domain/dtos/quest/create-quest.dto";

export class QuestService {
  constructor(private readonly playerService: PlayerService) {}

  async addQuestToPlayer(
    playerId: number,
    addQuestPlayerDTO: AddQuestPlayerDTO
  ) {
    const playerPromise = this.playerService.findOnePlayer(playerId);
    const questPromise = this.findOneQuestById(addQuestPlayerDTO.questId);

    const [player, quest] = await Promise.all([playerPromise, questPromise]);

    const questPlayer = new Quest_Player();
    questPlayer.player = player;
    questPlayer.quest = quest;

    try {
      return await questPlayer.save();
    } catch (error) {
      throw CustomError.internalServer("Something went wrong");
    }
  }

  async findOneQuestById(id: number) {
    const quest = await Quest.findOne({
      where: {
        id,
      },
    });

    if (!quest) throw CustomError.notFound("Quest not found");

    return quest;
  }

  async createNewQuest(createQuestDTO: CreateQuestDTO) {
    const questNameExists = await Quest.findOne({
      where: {
        name: createQuestDTO.name,
      },
    });

    if (questNameExists) throw CustomError.badRequest("Name already exists");

    const quest = new Quest();
    quest.name = createQuestDTO.name;
    quest.description = createQuestDTO.description;
    quest.reward = createQuestDTO.reward;
    quest.exp = createQuestDTO.exp;

    try {
      return await quest.save();
    } catch (error) {
      throw CustomError.internalServer("Something went very wrong! 🧨");
    }
  }
}
