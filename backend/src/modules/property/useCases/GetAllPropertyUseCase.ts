import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PropertyRepository } from '../repositories/PropertyRepository';

@Injectable()
export class GetAllPropertyUseCase {
  constructor(private propertyRepository: PropertyRepository) {}

  async execute(userId: string, page = 1, perPage = 10, order, filters = {}) {
    try {
      return await this.propertyRepository.getAllProperties(
        userId,
        page,
        perPage,
        order,
        filters,
      );
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Erro ao processar CSV.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
