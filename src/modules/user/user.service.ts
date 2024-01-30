import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { User } from '../../entities';
import { UserRepository } from '../../repositories';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRespository: UserRepository,
  ) {}

  createUser(user: QueryDeepPartialEntity<User>) {
    return this.userRespository.createUser(user);
  }

  async login(email: string, password: string) {
    const user = await this.userRespository.findUserByEmail(email);
    const isMatched = await this.userRespository.matchPassword(
      password,
      user.password,
    );
    if (isMatched !== true) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}
