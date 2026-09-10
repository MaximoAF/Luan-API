import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { IngresosService } from './ingresos.service';
import { CreateIngresoDto } from './dto/create-ingreso.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('ingresos')
export class IngresosController {
  constructor(private readonly ingresosService: IngresosService) {}

  // Público — sección "Próximos ingresos" del catálogo
  @Get()
  findAll() {
    return this.ingresosService.findAll();
  }

  // Protegido — el admin carga un nuevo ingreso
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateIngresoDto) {
    return this.ingresosService.create(dto);
  }

  // Protegido — quitar un ingreso (ya llegó, o se descartó)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ingresosService.remove(id);
  }
}
