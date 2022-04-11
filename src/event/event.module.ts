import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from './event.entity';
import { EventService } from './event.service';
import { AttendeeEntity } from './attendee.entity';
import { EventController } from './event.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity, AttendeeEntity])],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
