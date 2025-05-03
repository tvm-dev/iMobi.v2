import { Injectable } from '@nestjs/common';
import { Property } from 'src/modules/property/entitties/Property';
import { PropertyRepository } from 'src/modules/property/repositories/PropertyRepository';
import { PrismaService } from '../prisma.service';
import { PrismaPropertyMapper } from '../mappers/PrismaPropertyMapper';

@Injectable()
export class PrismaPropertyRepository implements PropertyRepository {
  constructor(private prisma: PrismaService) {}

  // Others
  async createNextPropertyNumber(userId: string): Promise<Property | null> {
    const lastAppointment = await this.prisma.property.findFirst({
      where: { userId },
      orderBy: { propertyNumber: 'desc' },
    });

    if (!lastAppointment) {
      return null;
    }

    return PrismaPropertyMapper.toDomain(lastAppointment);
  }

  // Post
  async createProperty(appointment: Property): Promise<Property> {
    const data = PrismaPropertyMapper.toPrisma(appointment);
    const property = await this.prisma.property.create({
      data: data,
    });

    return PrismaPropertyMapper.toDomain(property);
  }

  // Get
  async getAllProperties(
    userId: string,
    page: number,
    perPage: number,
    order: string,
    filters: Record<string, string> = {},
  ): Promise<{ data: Property[]; total: number }> {
    // Validando os filtros
    const invalidValues = ['Todos', 'Todas', 'Padrão', ''];
    // Filtra os campos com valores neutros
    const sanitizedFilters = Object.entries(filters || {}).reduce(
      (acc, [key, value]) => {
        if (!invalidValues.includes(value as string)) {
          acc[key] = value;
        }
        return acc;
      },
      {} as Record<string, string>,
    );

    // Adicionando os filtros no where
    const where = {
      userId,
      ...sanitizedFilters,
    };

    // Ordem em que os dados vão vir
    let orderBy: any = undefined;

    switch (order) {
      case 'Desconto (menor para maior)':
        orderBy = { Desconto: 'asc' };
        break;
      case 'Desconto (maior para menor)':
        orderBy = { Desconto: 'desc' };
        break;
      case 'Preço (menor para maior)':
        orderBy = { Preço: 'asc' };
        break;
      case 'Preço (maior para menor)':
        orderBy = { Preço: 'desc' };
        break;
      default:
        // ordem padrão (por exemplo, por data de criação ou nenhum orderBy)
        orderBy = { createdAt: 'desc' }; // ou undefined, se quiser sem ordenação
        break;
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.property.findMany({
        where,
        orderBy,
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      this.prisma.property.count({ where }),
    ]);

    return {
      data: data.map((property) => PrismaPropertyMapper.toDomain(property)),
      total,
    };
  }

  async getAvailableFilters(userId: string) {
    const [uf, cidade, bairro, modalidade, tipo] = await Promise.all([
      this.prisma.property.findMany({
        where: { userId },
        distinct: ['UF'],
        select: { UF: true },
      }),
      this.prisma.property.findMany({
        where: { userId },
        distinct: ['Cidade'],
        select: { Cidade: true },
      }),
      this.prisma.property.findMany({
        where: { userId },
        distinct: ['Bairro'],
        select: { Bairro: true },
      }),
      this.prisma.property.findMany({
        where: { userId },
        distinct: ['Modalidade'],
        select: { Modalidade: true },
      }),
      this.prisma.property.findMany({
        where: { userId },
        distinct: ['Tipo'],
        select: { Tipo: true },
      }),
    ]);

    return {
      uf: uf.map((item) => item.UF),
      cidade: cidade.map((item) => item.Cidade),
      bairro: bairro.map((item) => item.Bairro),
      modalidade: modalidade.map((item) => item.Modalidade),
      tipo: tipo.map((item) => item.Tipo),
    };
  }
}
