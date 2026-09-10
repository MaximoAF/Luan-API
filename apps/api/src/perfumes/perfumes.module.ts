import { Module } from '@nestjs/common';
import { PerfumesController } from './perfumes.controller';
import { PerfumesService } from './perfumes.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [PerfumesController],
  providers: [PerfumesService],
})
export class PerfumesModule {}
