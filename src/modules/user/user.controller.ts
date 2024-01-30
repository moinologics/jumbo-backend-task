import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserLoginDto } from '../../Dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userInput: CreateUserDto) {
    try {
      await this.userService.createUser(userInput);
      return { message: 'user created successfully' };
    } catch (error) {
      Logger.error(error, 'createUser');
      const message =
        error.code == 23505 ? 'email already exists' : 'unknown error';
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  login(@Body() userLoginInput: UserLoginDto) {
    return this.userService.login(
      userLoginInput.email,
      userLoginInput.password,
    );
  }
}
