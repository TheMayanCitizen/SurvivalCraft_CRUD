export class RegisterUserDto {
  private constructor(
    public readonly username: string,
    public readonly password: string,
    public readonly email: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { username, password, email } = object;

    if (!username) return ["Missing username"];
    if (!email) return ["Missing email"];
    if (!password) return ["Missing password"];

    return [undefined, new RegisterUserDto(username, password, email)];
  }
}
