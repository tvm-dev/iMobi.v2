import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { parse } from 'csv-parse/sync';
import * as path from 'path';
import * as fs from 'fs';
import * as iconv from 'iconv-lite';
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

    // Lê o arquivo como buffer
    const fileBuffer = fs.readFileSync(filePath);

    // Primeiro tenta decodificar como latin1, depois utf-8 se falhar
    let csvContent: string;
    try {
      csvContent = iconv.decode(fileBuffer, 'latin1');
      // Verifica se ainda contém caracteres inválidos, como '�'
      if (csvContent.includes('�')) {
        console.warn('latin1 com problemas, tentando utf-8...');
        csvContent = iconv.decode(fileBuffer, 'utf-8');
      }
    } catch (err) {
      console.warn('Erro com latin1, tentando utf-8...');
      csvContent = iconv.decode(fileBuffer, 'utf-8');
    }
    console.log('Linha de teste:', csvContent.split('\n')[0]);
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
              .replace(/ç/g, 'c')
              .replace(/�/g, '')
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/[^\w\s]/gi, '')
              .trim()
              .replace(/\s+/g, '_')
              .toLowerCase(),
          ),
      });
      const lastAppointment =
        await this.propertyRepository.createNextPropertyNumber(userId);

      const nextAppointmentNumber =
        Number(lastAppointment?.appointmentNumber ?? 0) + 1;

      await Promise.all(
        records.map((record: any, i: string) => {
          const property = new Property(
            {
              userId,
              UF: record.uf,
              Cidade: record.cidade,
              Bairro: record.bairro,
              Endereço: record.endereco,
              Preço: record.preco,
              Avaliação: record.valor_de_avaliacao,
              Desconto: record.desconto,
              Tipo: record.descricao?.split(',')[0]?.trim(),
              Modalidade: record.modalidade_de_venda,
              link: record.link_de_acesso,
            },
            (nextAppointmentNumber + i).toString(),
          );
          return this.propertyRepository.createProperty(property, userId);
        }),
      );

      return {
        success: true,
        quantidade: records.length,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Erro ao processar CSV.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      fs.unlinkSync(filePath);
    }
  }
}
