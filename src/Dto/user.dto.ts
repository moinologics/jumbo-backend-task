import { IsEmail, IsNumber, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  @MaxLength(500)
  password: string;
}

export class UpdateUserDto extends CreateUserDto {
  @IsNumber()
  id: number;
}

export class UserLoginDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  @MaxLength(500)
  password: string;
}
