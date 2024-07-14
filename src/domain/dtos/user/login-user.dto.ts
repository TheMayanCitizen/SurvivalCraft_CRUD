export class LoginUserDto {
  private constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  static login(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = object;

    if (!email) return ["Missing email"];
    if (!password) return ["Missing password"];

    return [undefined, new LoginUserDto(email, password)];
  }
}
