import { Body, Controller, Post } from '@nestjs/common';
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
}
