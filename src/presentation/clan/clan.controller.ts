import { Request, Response } from "express";
import { CreateClanDTO, CustomError, JoinMember } from "../../domain";
import { ClanService } from "../services/clan.service";

export class ClanController {
  constructor(private readonly clanService: ClanService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    console.log(error);
    return res.status(500).json({ message: "Something went very wrong! 🧨" });
  };

  addMemberToClan = async (req: Request, res: Response) => {
    const { playerReceiverId } = req.params;
    const [error, joinMemberDTO] = JoinMember.create(req.body);
    if (error) return res.status(422).json({ message: error });

    this.clanService
      .addMemberToClan(+playerReceiverId, joinMemberDTO!)
      .then((resp) => res.status(200).json({ message: "Member added to clan" }))
      .catch((error) => this.handleError(error, res));
  };

  createClan = async (req: Request, res: Response) => {
    const [error, createClanDTO] = CreateClanDTO.create(req.body);
    if (error) return res.status(422).json({ message: error });

    this.clanService
      .createClan(createClanDTO!)
      .then((resp) => res.status(200).json({ message: "Clan created" }))
      .catch((error) => this.handleError(error, res));
  };

  findAllMembersByClanId = async (req: Request, res: Response) => {
    const { clanId } = req.params;

    this.clanService
      .findAllMembersByClanId(+clanId)
      .then((clanMembers) => res.status(200).json(clanMembers))
      .catch((error) => this.handleError(error, res));
  };
}
