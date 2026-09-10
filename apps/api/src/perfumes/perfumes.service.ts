import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePerfumeDto } from './dto/update-perfume.dto';
import { join } from 'path';
import { existsSync, unlinkSync } from 'fs';
import { CreatePerfumeDto } from './dto/create-perfume.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PerfumesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.perfume.findMany({ orderBy: { id: 'asc' } });
  }

  async findOne(id: number) {
    const perfume = await this.prisma.perfume.findUnique({ where: { id } });
    if (!perfume) throw new NotFoundException('Perfume no encontrado');
    return perfume;
  }

  async update(id: number, dto: UpdatePerfumeDto) {
    await this.findOne(id); // 404 si no existe
    return this.prisma.perfume.update({ where: { id }, data: dto });
  }

    async setImage(id: number, imageUrl: string) {
    await this.findOne(id);
    return this.prisma.perfume.update({ where: { id }, data: { imageUrl } });
  }

  async create(dto: CreatePerfumeDto) {
  try {
    return await this.prisma.perfume.create({ data: dto });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      throw new ConflictException(`Ya existe un perfume con el SKU "${dto.sku}"`);
    }
    throw err;
  }
}

  async removeImage(id: number) {
    const perfume = await this.findOne(id);
    if (perfume.imageUrl) {
      const filePath = join(process.cwd(), perfume.imageUrl.replace(/^\//, ''));
      if (existsSync(filePath)) unlinkSync(filePath);
    }
    return this.prisma.perfume.update({ where: { id }, data: { imageUrl: null } });
  }
}
