import { IsNotEmpty, IsString } from 'class-validator';

export class CreateIngresoDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  family: string;

  @IsString()
  @IsNotEmpty()
  fam: string; // slug: floral | amaderado | citrico | oriental | fresco

  @IsString()
  @IsNotEmpty()
  eta: string; // "Mediados de agosto", texto libre

  @IsString()
  @IsNotEmpty()
  description: string;
}
