import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventController } from './event.controller';
import { EventEntity } from './event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity])],
  controllers: [EventController],
})
export class EventModule {}
