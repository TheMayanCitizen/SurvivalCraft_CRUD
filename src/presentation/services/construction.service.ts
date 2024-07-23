import { Construction } from "../../data";
import { CustomError } from "../../domain";
import { CreateConstructionDTO } from "../../domain/dtos/construction/create-construction.dto";
export class ConstructionService {
  constructor() {}

  async createConstruction(createConstructionDTO: CreateConstructionDTO) {
    const construction = new Construction();
    construction.name = createConstructionDTO.name;
    construction.type = createConstructionDTO.type;
    construction.location = createConstructionDTO.location;

    try {
      return await construction.save();
    } catch (error) {
      throw CustomError.internalServer("Something went very wrong! 🧨");
    }
  }
}
