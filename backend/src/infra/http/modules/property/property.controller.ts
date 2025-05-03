import {
  Controller,
  Get,
  Post,
  Query,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreatePropertyUseCase } from 'src/modules/property/useCases/CreatePropertyUseCase';
import { AuthenticatedRequestModel } from '../auth/models/authentucatedRequestModel';
import { GetAllPropertyUseCase } from 'src/modules/property/useCases/GetAllPropertyUseCase';
import { GetPropertyFiltersUseCase } from 'src/modules/property/useCases/GetPropertyFilterUseCase';
import { PropertyViewModel } from './viewModel/propertyViewModel';

@Controller('property')
export class PropertyController {
  constructor(
    private createPropertyUseCase: CreatePropertyUseCase,

    private getAllPropertyUseCase: GetAllPropertyUseCase,
    private getPropertyFiltersUseCase: GetPropertyFiltersUseCase,
  ) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`);
        },
      }),
    }),
  )
  async uploadCsv(
    @UploadedFile() file: Express.Multer.File,
    @Request() request: AuthenticatedRequestModel,
  ) {
    const userId = request.user.id;
    const response = await this.createPropertyUseCase.execute(file, userId);
    return response;
  }

  // Get
  @Get('/filters')
  async getPropertyFilters(@Request() request: AuthenticatedRequestModel) {
    const userId = request.user.id;
    return this.getPropertyFiltersUseCase.execute(userId);
  }

  @Get()
  async getPropertys(
    @Request() request: AuthenticatedRequestModel,
    @Query() query,
  ) {
    const userId = request.user.id;

    const page = parseInt(query.page) || 1;
    const perPage = parseInt(query.perPage) || 10;
    const order = query.order;
    const filters = {
      UF: query.uf,
      Cidade: query.cidade,
      Bairro: query.bairro,
      Modalidade: query.modalidade,
      Tipo: query.tipo,
    };

    const properties = await this.getAllPropertyUseCase.execute(
      userId,
      page,
      perPage,
      order,
      filters,
    );

    const finalData = {
      total: properties.total,
      data: properties.data.map((property) =>
        PropertyViewModel.toHttp(property),
      ),
    };
    return finalData;
  }
}
