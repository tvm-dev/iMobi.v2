import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from '../../models/UserPayload';
import { User } from 'src/modules/user/entities/User';

interface SignInRequest {
  user: User;
}

@Injectable()
export class SignInUseCase {
  constructor(private jwtService: JwtService) {}

  async execute({ user }: SignInRequest) {
    console.log('JWT_SECRET no signInUseCase:', process.env.JWT_SECRET);

    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt.toJSON(),
    };

    const jwtToken = this.jwtService.sign(payload);

    return jwtToken;
  }
}
