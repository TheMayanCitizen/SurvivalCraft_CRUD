export class CreateQuestDTO {
  private constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly reward: string,
    public readonly exp: number
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateQuestDTO?] {
    const { name, description, reward, exp } = object;

    if (!name) return ["Missing name"];
    if (!description) return ["Missing description"];
    if (!reward) return ["Missing reward"];
    if (!exp) return ["Missing exp"];

    return [undefined, new CreateQuestDTO(name, description, reward, exp)];
  }
}
