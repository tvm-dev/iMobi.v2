import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserBody {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
