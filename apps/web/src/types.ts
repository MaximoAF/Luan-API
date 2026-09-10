export interface Perfume {
  id: number;
  sku: string;
  name: string;
  family: string;
  fam: string;
  topNotes: string;
  heartNotes: string;
  baseNotes: string;
  description: string;
  imageUrl: string | null;
  price: number;
  offerPrice: number | null;
  stock: number;
  maxStock: number;
}

export interface ProximoIngreso {
  id: number;
  name: string;
  family: string;
  fam: string;
  eta: string;
  description: string;
}

export interface UpdatePerfumeDto {
  price?: number;
  stock?: number;
  offerPrice?: number | null;
}

export interface CreateIngresoDto {
  name: string;
  family: string;
  fam: string;
  eta: string;
  description: string;
}

export interface CreatePerfumeDto {
  sku: string;
  name: string;
  family: string;
  fam: string;
  topNotes: string;
  heartNotes: string;
  baseNotes: string;
  description: string;
  price: number;
  stock: number;
  maxStock: number;
}

export type StockLevel = 'empty' | 'critical' | 'low' | 'good';
