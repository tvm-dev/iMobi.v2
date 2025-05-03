import { Property as PropertyRaw } from 'generated/prisma';
import { Property } from 'src/modules/property/entitties/Property';

export class PrismaPropertyMapper {
  static toPrisma(property: Property): PropertyRaw {
    return {
      userId: property.userId,
      propertyNumber: property.appointmentNumber,

      UF: property.UF,
      Cidade: property.Cidade,
      Bairro: property.Bairro,
      Endereço: property.Endereço,
      Preço: property.Preço,
      Avaliação: property.Avaliação,
      Desconto: property.Desconto,
      Tipo: property.Tipo,
      Modalidade: property.Modalidade,
      link: property.link,

      createdAt: property.createdAt,
      updatedAt: property.updatedAt,
    };
  }

  static toDomain(raw: PropertyRaw): Property {
    return new Property(
      {
        userId: raw.userId,
        UF: raw.UF,
        Cidade: raw.Cidade,
        Bairro: raw.Bairro,
        Endereço: raw.Endereço,
        Preço: raw.Preço,
        Avaliação: raw.Avaliação,
        Desconto: raw.Desconto,
        Tipo: raw.Tipo,
        Modalidade: raw.Modalidade,
        link: raw.link,

        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.propertyNumber,
    );
  }
}
