import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingController } from './training.controller';

@Module({
  imports: [TypeOrmModule.forFeature()],
  controllers: [TrainingController],
})
export class SchoolModule {}
