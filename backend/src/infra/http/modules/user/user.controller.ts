import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { Public } from '../auth/decorators/isPublic';
import { CreateUserUseCase } from 'src/modules/user/useCases/CreateUserUseCase';
import { CreateUserBody } from './dtos/createUserBody';
import { UserViewModel } from './viewModel/userViewModel';

@Controller('user')
export class userController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  // Criar um usuario
  @Post()
  @Public()
  async createPost(@Body() body: CreateUserBody) {
    const user = await this.createUserUseCase.execute(body);

    return UserViewModel.toHttp(user);
  }

  // Pegar 1 usuario pelo id
  // @Get(':id')
  // async getUser(
  //   @Request() request: AuthenticatedRequestModel,
  //   @Param('id') userId: string,
  // ) {
  //   const user = await this.getUserUseCase.execute({ userId });

  //   return UserViewModel.toHttp(user);
  // }

  // // Pegar todos os usuarios
  // @Get()
  // async getUsers(@Request() request: AuthenticatedRequestModel) {
  //   const users = await this.getManyUseCase.execute();

  //   return users.map(UserViewModel.toHttp);
  // }

  // // Atualizar 1 usuario
  // @Patch(':id')
  // async updateUser(
  //   @Param('id') userId: string,
  //   @Body() updateUserBody: UpdateUserBody,
  // ) {
  //   const user = await this.updateUserUseCase.execute(userId, updateUserBody);

  //   return UserViewModel.toHttp(user);
  // }
}
