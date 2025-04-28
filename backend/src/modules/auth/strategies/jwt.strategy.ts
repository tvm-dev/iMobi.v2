import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { UserPayload } from '../models/UserPayload'; // Se tiver esse tipo

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(), // 1. Authorization: Bearer
        (req: Request) => req?.cookies?.['token'] || null, // 2. Cookie
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'SUA_CHAVE_SECRETA',
    });
  }

  async validate({ sub, ...payload }: UserPayload) {
    return { id: sub, ...payload };
  }
}
