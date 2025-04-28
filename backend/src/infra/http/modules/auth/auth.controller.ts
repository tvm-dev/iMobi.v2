import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { SignInUseCase } from 'src/modules/auth/useCases/signInUseCase/SignInUseCase';
import { Public } from './decorators/isPublic';
import { LocalAuthGuard } from './guards/localAuth.Guard';
import { JwtAuthGuard } from './guards/jwtAuth.Guard';
import { setAuthCookie } from 'src/utils/setAuthCookie';
import { AuthenticatedRequestModel } from './models/authentucatedRequestModel';
import { AuthRequestModel } from './models/authRequestModel';

@Controller()
export class AuthController {
  constructor(private signInUseCase: SignInUseCase) {}
  // const ms = require('ms');

  @Post('signIn')
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async signIn(
    @Request() request: AuthRequestModel,
    @Res({ passthrough: true }) response: Response,
  ) {
    const access_token = await this.signInUseCase.execute({
      user: request.user,
    });

    setAuthCookie(response, access_token);

    return { message: 'Login realizado com sucesso' };
  }

  @Delete('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('token', {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    return { message: 'Logout realizado com sucesso' };
  }

  @Get('test')
  @UseGuards(JwtAuthGuard)
  async teste(@Request() request: AuthenticatedRequestModel) {
    return request.user;
  }
}
