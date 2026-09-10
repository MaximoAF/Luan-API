import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreatePerfumeDto {
  @IsString() @IsNotEmpty() sku: string;
  @IsString() @IsNotEmpty() name: string;
  @IsString() @IsNotEmpty() family: string;
  @IsString() @IsNotEmpty() fam: string;
  @IsString() @IsNotEmpty() topNotes: string;
  @IsString() @IsNotEmpty() heartNotes: string;
  @IsString() @IsNotEmpty() baseNotes: string;
  @IsString() @IsNotEmpty() description: string;

  @IsInt() @Min(0) price: number;
  @IsInt() @Min(0) stock: number;
  @IsInt() @Min(1) maxStock: number;

  @IsOptional() @IsInt() @Min(0) offerPrice?: number;
}