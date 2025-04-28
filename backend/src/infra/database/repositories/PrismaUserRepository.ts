import { User } from 'src/modules/user/entities/User';
import { UserRepository } from 'src/modules/user/repositories/UserRepository';
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../mappers/PrismaUserMapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    const userRaw = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.create({
      data: userRaw,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return null;

    return PrismaUserMapper.toDomain(user);
  }

  async findById(userId: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) return null;

    return PrismaUserMapper.toDomain(user);
  }

  async findMany(): Promise<User[] | null> {
    const users = await this.prisma.user.findMany();

    if (!users) return null;

    return users.map(PrismaUserMapper.toDomain);
  }

  async updateUserById(
    userId: string,
    updateProps: Partial<User>,
  ): Promise<User | null> {
    //Filtrando apenas campos que podem ser atualizados
    const allowedFields = [
      'name',
      'email',
      'address',
      'phone',
      'birthDate',
      'status',
      'userType',
      'city',
      'postalCode',
      'state',
    ];

    const filteredUpdateProps = Object.fromEntries(
      Object.entries(updateProps).filter(([key]) =>
        allowedFields.includes(key),
      ),
    );

    // Atualizando dados do usuario
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: filteredUpdateProps,
    });

    if (!user) return null;

    return PrismaUserMapper.toDomain(user);
  }
}
