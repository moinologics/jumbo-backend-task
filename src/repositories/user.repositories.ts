import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { User } from '../entities';

export class UserRepository {
  BCRYPT_ROUNDS = 10;

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  private async generatePasswordHash(password: string) {
    return await bcrypt.hash(password, this.BCRYPT_ROUNDS);
  }

  async matchPassword(InputPassword: string, userPassowrdHash: string) {
    return await bcrypt.compare(InputPassword, userPassowrdHash);
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async createUser(user: QueryDeepPartialEntity<User>): Promise<void> {
    user.password = await this.generatePasswordHash(
      user.password.toString().trim(),
    );
    await this.userRepository.insert(user);
  }
}
