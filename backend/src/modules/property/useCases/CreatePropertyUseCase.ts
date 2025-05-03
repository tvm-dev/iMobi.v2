import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { parse } from 'csv-parse/sync';
import * as path from 'path';
import * as fs from 'fs';
import { PropertyRepository } from '../repositories/PropertyRepository';
import { Property } from '../entitties/Property';

@Injectable()
export class CreatePropertyUseCase {
  constructor(private propertyRepository: PropertyRepository) {}

  async execute(file: Express.Multer.File, userId: string) {
    if (!file) {
      throw new HttpException('Arquivo não enviado.', HttpStatus.BAD_REQUEST);
    }

    const filePath = path.resolve(file.path);
    const csvContent = fs.readFileSync(filePath, 'utf-8');

    // Remove cabeçalhos desnecessários
    const lines = csvContent.split('\n').slice(2);
    const cleaned = lines.join('\n');

    try {
      const records = parse(cleaned, {
        delimiter: ';',
        skip_empty_lines: true,
        trim: true,
        columns: (header: string[]) =>
          header.map((col) =>
            col
              .replace(/ç/g, 'c') // substitui manualmente caracteres problemáticos
              .replace(/�/g, '') // remove caracteres corrompidos
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '') // remove acentos

              .replace(/[^\w\s]/gi, '') // remove caracteres especiais
              .trim()
              .replace(/\s+/g, '_') // substitui espaços por underline
              .toLowerCase(),
          ),
      });

      // Encontrar o último appointment para o usuário específico
      const lastAppointment =
        await this.propertyRepository.createNextPropertyNumber(userId);

      // Calcular o próximo appointmentNumber
      const nextAppointmentNumber =
        Number(lastAppointment?.appointmentNumber ?? 0) + 1;

      // Criar uma nova instância de Appointment com o número calculado
      const properties = await Promise.all(
        records.map((record: any, i: string) => {
          const property = new Property(
            {
              userId,
              UF: record.uf,
              Cidade: record.cidade,
              Bairro: record.bairro,
              Endereço: record.endereo,
              Preço: record.preo,
              Avaliação: record.valor_de_avaliao,
              Desconto: record.desconto,
              Tipo: record.descrio?.split(',')[0]?.trim(),
              Modalidade: record.modalidade_de_venda,
              link: record.link_de_acesso,
              // record.link_de_acesso
            },
            (nextAppointmentNumber + i).toString(),
          );
          return this.propertyRepository.createProperty(property);
        }),
      );

      // -------------------------------------

      return {
        success: true,
        quantidade: records.length,
        exemplo: records.slice(0, 3), // Retorna os 3 primeiros registros
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Erro ao processar CSV.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      // Remover o arquivo temporário
      fs.unlinkSync(filePath);
    }
  }
}
