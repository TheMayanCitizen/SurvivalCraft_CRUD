import { Resource } from "../../data";
import { CreateResourceDTO, CustomError } from "../../domain";

export class ResourceService {
  async findOneResourceById(id: number) {
    const resource = await Resource.findOne({
      where: {
        id,
      },
    });

    if (!resource) throw CustomError.notFound("Resource not found");

    return resource;
  }

  async createResource(createResourceDTO: CreateResourceDTO) {
    const resourceExists = await Resource.findOne({
      where: {
        name: createResourceDTO.name,
      },
    });

    if (resourceExists) throw CustomError.badRequest("Resource already exists");

    const resource = new Resource();
    resource.name = createResourceDTO.name;
    resource.description = createResourceDTO.description;

    try {
      return await resource.save();
    } catch (error) {
      throw CustomError.internalServer("Something went very wrong! 🧨");
    }
  }

  async findAllResources() {
    try {
      return await Resource.find();
    } catch (error) {
      throw CustomError.internalServer("Something went very wrong! 🧨");
    }
  }
}
