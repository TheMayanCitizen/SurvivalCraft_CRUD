export class CreateResourceDTO {
  private constructor(
    public readonly name: string,
    public readonly description: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateResourceDTO?] {
    const { name, description } = object;

    if (!name) return ["Missing resource name"];
    if (!description) return ["Missing resource description"];

    return [undefined, new CreateResourceDTO(name, description)];
  }
}
