import { Clan, Clan_Member } from "../../data";
import { ClanMemberRole } from "../../data/postgres/models/types/clanMember.types";
import { CreateClanDTO, CustomError, JoinMember } from "../../domain";
import { PlayerService } from "./player.service";

export class ClanService {
  constructor(private readonly playerService: PlayerService) {}

  async addMemberToClan(playerReceiverId: number, joinMemberDTO: JoinMember) {
    const playerReceiverPromise =
      this.playerService.findOnePlayer(playerReceiverId);
    const playerSenderPromise = this.playerService.findOnePlayer(
      joinMemberDTO.senderMemberId
    );

    const [playerReceiver, playerSender] = await Promise.all([
      playerReceiverPromise,
      playerSenderPromise,
    ]);

    if (!playerReceiver)
      throw CustomError.notFound("Player Receiver not found");
    if (!playerSender) throw CustomError.notFound("Player Sender not found");

    const allowedRoles = [
      ClanMemberRole.MASTER,
      ClanMemberRole.OFFICER,
      ClanMemberRole.SUBOFFICER,
    ];

    if (!allowedRoles.includes(playerSender.clan_member[0].role)) {
      throw CustomError.badRequest(
        "You don't have permission to invite to the clan"
      );
    }

    const clanMember = new Clan_Member();
    clanMember.player = playerReceiver;
    clanMember.clan = playerSender.clan_member[0].clan;

    try {
      return await clanMember.save();
    } catch (error) {
      throw CustomError.internalServer("Something went wrong");
    }
  }

  async createClan(createClanDTo: CreateClanDTO) {
    const clanNameExists = await Clan.findOne({
      where: {
        name: createClanDTo.name,
      },
    });

    if (clanNameExists) throw CustomError.badRequest("Name already exists");

    const clan = new Clan();
    clan.name = createClanDTo.name;

    try {
      return await clan.save();
    } catch (error) {
      throw CustomError.internalServer("Something went very wrong! 🧨");
    }
  }

  async findAllMembersByClanId(clanId: number) {
    const clanMembers = await Clan.findOne({
      where: {
        id: clanId,
      },
      relations: {
        clan_member: true,
      },
    });

    if (!clanMembers) throw CustomError.notFound("Clan not found");

    // const clanMembers = clanMembers.clan_member;

    return clanMembers;
  }
}
