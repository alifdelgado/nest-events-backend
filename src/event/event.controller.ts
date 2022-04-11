import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from './event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AttendeeEntity } from './attendee.entity';
import { EventService } from './event.service';
import { ListEvents } from './input/list.event';

@Controller('/events')
export class EventController {
  private readonly logger = new Logger(EventController.name);

  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
    @InjectRepository(AttendeeEntity)
    private readonly attendeeRepository: Repository<AttendeeEntity>,
    private readonly eventService: EventService,
  ) {}

  @Get()
  async findAll(@Query() filter: ListEvents) {
    this.logger.debug(filter);
    const events = await this.eventService.getEventsWithAttendeeCountFiltered(
      filter,
    );
    return events;
  }

  @Get(':id')
  async findOne(@Param('id') id) {
    const event = await this.eventRepository.findOne(id);
    if (!event) {
      throw new NotFoundException();
    }
    return event;
  }

  @Post()
  async create(@Body() input: CreateEventDto) {
    return await this.eventRepository.save({
      ...input,
      when: new Date(input.when),
    });
  }

  @Patch(':id')
  async update(@Param('id') id, @Body() input: UpdateEventDto) {
    const event = await this.eventRepository.findOne(id);
    if (!event) {
      throw new NotFoundException();
    }
    return await this.eventRepository.save({
      ...event,
      ...input,
      when: input.when ? new Date(input.when) : event.when,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id) {
    const event = await this.eventRepository.findOne(id);
    if (!event) {
      throw new NotFoundException();
    }
    await this.eventRepository.remove(event);
  }
}
