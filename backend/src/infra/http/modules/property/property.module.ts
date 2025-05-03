import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { PropertyController } from './property.controller';
import { CreatePropertyUseCase } from 'src/modules/property/useCases/CreatePropertyUseCase';
import { GetAllPropertyUseCase } from 'src/modules/property/useCases/GetAllPropertyUseCase';
import { GetPropertyFiltersUseCase } from 'src/modules/property/useCases/GetPropertyFilterUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [PropertyController],
  providers: [
    CreatePropertyUseCase,
    GetAllPropertyUseCase,
    GetPropertyFiltersUseCase,
  ],
  exports: [DatabaseModule],
})
export class PropertyModule {}
