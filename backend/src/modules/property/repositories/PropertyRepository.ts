import { Property } from '../entitties/Property';

export abstract class PropertyRepository {
  abstract createProperty(appointment: Property): Promise<Property>;
  // Get
  abstract getAllProperties(
    userId: string,
    page: number,
    perPage: number,
    order: string,
    filters: Record<string, string>,
  ): Promise<{ data: Property[]; total: number }>;

  abstract getAvailableFilters(userId: string): Promise<any>;
  // Others
  // Criar id
  abstract createNextPropertyNumber(userId: string): Promise<Property | null>;
}
