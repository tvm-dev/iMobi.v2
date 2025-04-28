import { User } from 'src/modules/user/entities/User';
import { User as UserRaw } from 'generated/prisma';

export class PrismaUserMapper {
  static toPrisma(user: User): UserRaw {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
      emailCompare: user.emailCompare,
      nameCompare: user.nameCompare,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static toDomain({
    id,
    createdAt,
    email,
    name,
    password,
    updatedAt,
    emailCompare,
    nameCompare,
  }: UserRaw): User {
    return new User(
      {
        createdAt,
        email,
        name,
        password,
        updatedAt,
        emailCompare,
        nameCompare,
      },
      id,
    );
  }
}
