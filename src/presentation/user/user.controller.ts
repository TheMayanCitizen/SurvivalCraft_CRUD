import { Request, Response } from "express";
import { CustomError, RegisterUserDto } from "../../domain";
import { UserService } from "../services/user.service";
import { LoginUserDto } from "../../domain/dtos/user/login-user.dto";

export class UserController {
  constructor(private readonly userService: UserService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    console.log(error);
    return res.status(500).json({ message: "Something went very wrong! 🧨" });
  };

  findOneUserById = async (req: Request, res: Response) => {
    const { id } = req.params;

    this.userService
      .findOneUserById(+id)
      .then((user) => res.status(200).json(user))
      .catch((error) => this.handleError(error, res));
  };

  register = async (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) return res.status(422).json({ message: error });

    this.userService
      .registerNewUser(registerUserDto!)
      .then((data) => res.status(200).json(data))
      .catch((error) => this.handleError(error, res));
  };

  login = async (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.login(req.body);
    if (error) return res.status(422).json({ message: error });

    this.userService
      .login(loginUserDto!)
      .then((data) => res.status(200).json(data))
      .catch((err) => this.handleError(err, res));
  };
}
