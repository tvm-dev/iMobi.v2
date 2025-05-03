import { Property } from 'src/modules/property/entitties/Property';

export class PropertyViewModel {
  static toHttp({
    createdAt,
    Avaliação,
    Bairro,
    Cidade,
    Desconto,
    Endereço,
    Modalidade,
    Preço,
    Tipo,
    UF,
    appointmentNumber,
    link,
  }: Property) {
    return {
      createdAt,
      Avaliação,
      Bairro,
      Cidade,
      Desconto,
      Endereço,
      Modalidade,
      Preço,
      Tipo,
      UF,
      link,
      appointmentNumber,
    };
  }
}
