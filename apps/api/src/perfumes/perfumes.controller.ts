import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { PerfumesService } from "./perfumes.service";
import { UpdatePerfumeDto } from "./dto/update-perfume.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { perfumeImageStorage } from "./perfume-image.storage";
import { CreatePerfumeDto } from "./dto/create-perfume.dto";

@Controller("perfumes")
export class PerfumesController {
  constructor(private readonly perfumesService: PerfumesService) {}

  // Público — catálogo del cliente
  @Get()
  findAll() {
    return this.perfumesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreatePerfumeDto) {
    return this.perfumesService.create(dto);
  }

  // Público — detalle de un perfume
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.perfumesService.findOne(id);
  }

  // Protegido — editar precio / stock / oferta desde el panel admin
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdatePerfumeDto) {
    return this.perfumesService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id/image")
  @UseInterceptors(FileInterceptor("image", { storage: perfumeImageStorage }))
  uploadImage(
    @Param("id", ParseIntPipe) id: number,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|webp)$/,
          skipMagicNumbersValidation: true,
        })
        .addMaxSizeValidator({ maxSize: 5 * 1024 * 1024 }) // 5 MB
        .build({ errorHttpStatusCode: 422 }),
    )
    file: Express.Multer.File,
  ) {
    return this.perfumesService.setImage(
      id,
      `/uploads/perfumes/${file.filename}`,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id/image")
  removeImage(@Param("id", ParseIntPipe) id: number) {
    return this.perfumesService.removeImage(id);
  }
}
