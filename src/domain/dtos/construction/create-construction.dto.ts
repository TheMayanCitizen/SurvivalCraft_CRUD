export class CreateConstructionDTO {
  private constructor(
    public readonly name: string,
    public readonly type: string,
    public readonly location: string,
    public readonly playerId: string
  ) {}

  static create(object: {
    [key: string]: any;
  }): [string?, CreateConstructionDTO?] {
    const { name, type, location, playerId } = object;

    if (!name) return ["Missing name"];
    if (!type) return ["Missing type"];
    if (!location) return ["Missing location"];
    if (!playerId) return ["Missing playerId"];

    return [
      undefined,
      new CreateConstructionDTO(name, type, location, playerId),
    ];
  }
}
