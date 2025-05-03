import { Replace } from 'src/utils/replace';

interface PropertySchema {
  userId: string;

  UF: string;
  Cidade: string;
  Bairro: string;
  Endereço: string;
  Preço: string;
  Avaliação: string;
  Desconto: string;
  Tipo: string;
  Modalidade: string;
  link: string;

  createdAt: Date;
  updatedAt: Date;
}

export class Property {
  private props: PropertySchema;
  private _appointmentNumber: string;

  constructor(
    props: Replace<PropertySchema, { createdAt?: Date; updatedAt?: Date }>,
    appointmentNumber: string,
  ) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
    this._appointmentNumber = appointmentNumber;
  }

  get userId(): string {
    return this.props.userId;
  }

  get appointmentNumber(): string {
    return this._appointmentNumber;
  }

  get UF(): string {
    return this.props.UF;
  }

  set UF(UF: string) {
    this.props.UF = UF;
  }

  get Cidade(): string {
    return this.props.Cidade;
  }

  set Cidade(Cidade: string) {
    this.props.Cidade = Cidade;
  }

  get Bairro(): string {
    return this.props.Bairro;
  }

  set Bairro(Bairro: string) {
    this.props.Bairro = Bairro;
  }

  get Endereço(): string {
    return this.props.Endereço;
  }

  set Endereço(Endereço: string) {
    this.props.Endereço = Endereço;
  }

  get Preço(): string {
    return this.props.Preço;
  }

  set Preço(Preço: string) {
    this.props.Preço = Preço;
  }

  get Avaliação(): string {
    return this.props.Avaliação;
  }

  set Avaliação(Avaliação: string) {
    this.props.Avaliação = Avaliação;
  }

  get Desconto(): string {
    return this.props.Desconto;
  }

  set Desconto(Desconto: string) {
    this.props.Desconto = Desconto;
  }

  get Tipo(): string {
    return this.props.Tipo;
  }

  set Tipo(Tipo: string) {
    this.props.Tipo = Tipo;
  }

  get Modalidade(): string {
    return this.props.Modalidade;
  }

  set Modalidade(Modalidade: string) {
    this.props.Modalidade = Modalidade;
  }

  get link(): string {
    return this.props.link;
  }

  set link(link: string) {
    this.props.link = link;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
