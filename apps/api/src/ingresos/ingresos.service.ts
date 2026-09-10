import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateIngresoDto } from './dto/create-ingreso.dto';

@Injectable()
export class IngresosService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.proximoIngreso.findMany({ orderBy: { createdAt: 'desc' } });
  }

  create(dto: CreateIngresoDto) {
    return this.prisma.proximoIngreso.create({ data: dto });
  }

  async remove(id: number) {
    const item = await this.prisma.proximoIngreso.findUnique({ where: { id } });
    if (!item) throw new NotFoundException('Próximo ingreso no encontrado');
    return this.prisma.proximoIngreso.delete({ where: { id } });
  }
}
