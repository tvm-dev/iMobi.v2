import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateAppointmentBody {
  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  link?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  observations?: string;

  @IsDate()
  @Type(() => Date)
  date?: Date;

  @IsString()
  @IsOptional()
  hour?: string;
}
