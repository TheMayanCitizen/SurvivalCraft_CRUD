import { Request, Response } from "express";
import { CreateConstructionDTO, CustomError } from "../../domain";
import { ConstructionService } from "../services/construction.service";
export class ConstructionController {
  constructor(private readonly constructionService: ConstructionService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    console.log(error);
    return res.status(500).json({ message: "Something went very wrong! 🧨" });
  };

  createNewConstruction = async (req: Request, res: Response) => {
    const [error, createConstructionDTO] = CreateConstructionDTO.create(
      req.body
    );
    if (error) return res.status(422).json({ message: error });

    this.constructionService
      .createConstruction(createConstructionDTO!)
      .then((resource) => res.status(201).json(resource))
      .catch((error) => this.handleError(error, res));
  };
}
