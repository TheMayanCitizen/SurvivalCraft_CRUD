import { bcryptAdapter, JwtAdapter } from "../../config";
import { User } from "../../data";
import { CustomError, RegisterUserDto } from "../../domain";
import { LoginUserDto } from "../../domain/dtos/user/login-user.dto";

export class UserService {
  constructor() {}

  async registerNewUser(userRegistrationData: RegisterUserDto) {
    // const user = new User();
    const userExists = await User.findOne({
      where: {
        email: userRegistrationData.email,
        username: userRegistrationData.username,
      },
    });

    if (userExists) throw CustomError.badRequest("Email already exists");

    const user = new User();
    user.username = userRegistrationData.username;
    user.email = userRegistrationData.email;
    user.password = userRegistrationData.password;

    try {
      await user.save();
      const token = await JwtAdapter.generateToken({ id: user.id });
      if (!token) throw CustomError.internalServer("Error while creating JWT");

      return {
        user: {
          email: user.email,
          username: user.username,
        },
      };
    } catch (error: any) {
      throw CustomError.internalServer(error);
    }
  }

  async login(loginUserData: LoginUserDto) {
    const user = await User.findOne({
      where: {
        email: loginUserData.email,
      },
    });

    if (!user) throw CustomError.unAuthorized("Invalid credentials");

    const isMatching = bcryptAdapter.compare(
      loginUserData.password,
      user.password
    );
    if (!isMatching) throw CustomError.unAuthorized("Invalid Credentials");

    const token = await JwtAdapter.generateToken({ id: user.id });
    if (!token) throw CustomError.internalServer("Error while creating JWT");

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }

  async findOneUserById(id: number) {
    const user = await User.findOne({
      where: {
        id,
      },
      relations: ["players"],
    });

    if (!user) {
      throw CustomError.notFound(`User with id ${id} was not found`);
    }
    return user;
  }
}
