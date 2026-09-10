import { IsInt, IsOptional, Min } from 'class-validator';

export class UpdatePerfumeDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number;

  // Precio promocional. Mandar `null` explícito para quitar la oferta.
  @IsOptional()
  @IsInt()
  @Min(0)
  offerPrice?: number | null;
}
