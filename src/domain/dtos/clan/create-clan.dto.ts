export class CreateClanDTO {
  private constructor(public readonly name: string) {}

  static create(object: { [key: string]: any }): [string?, CreateClanDTO?] {
    const { name } = object;

    if (!name) return ["Name is required"];

    return [undefined, new CreateClanDTO(name)];
  }
}
