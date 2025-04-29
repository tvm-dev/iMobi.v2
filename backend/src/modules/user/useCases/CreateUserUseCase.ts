import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/UserRepository';
import { User } from '../entities/User';
import { CryptoService } from 'src/infra/crypto/crypto.service';

interface CreateUserRequest {
  email: string;
  password: string;
  name: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, name, password }: CreateUserRequest) {
    const user = new User({
      email: CryptoService.encrypt(email),
      name: CryptoService.encrypt(name),
      password: await CryptoService.hashPassword(password),
      emailCompare: CryptoService.hashForCompare(email),
      nameCompare: CryptoService.hashForCompare(name),
    });

    await this.userRepository.create(user);

    return user;
  }
}
