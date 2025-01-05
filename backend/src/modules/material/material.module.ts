import { Module } from '@nestjs/common';
import { MaterialController } from './material.controller';
import { MaterialService } from './material.service';
import { MaterialRepository } from './repository';

@Module({
  controllers: [MaterialController],
  providers: [MaterialService, MaterialRepository],
})
export class MaterailModule {}
