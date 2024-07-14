export class RegisterPlayerDto {
  private constructor(public readonly name: string) {}

  static create(object: { [key: string]: any }): [string?, RegisterPlayerDto?] {
    const { name } = object;

    if (!name) return ["Missing name"];

    return [undefined, new RegisterPlayerDto(name)];
  }
}
