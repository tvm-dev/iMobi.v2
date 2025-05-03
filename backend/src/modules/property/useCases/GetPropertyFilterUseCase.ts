import { Injectable } from '@nestjs/common';
import { PropertyRepository } from '../repositories/PropertyRepository';

@Injectable()
export class GetPropertyFiltersUseCase {
  constructor(private propertyRepository: PropertyRepository) {}

  async execute(userId: string) {
    const filters = await this.propertyRepository.getAvailableFilters(userId);
    return filters;
  }
}
