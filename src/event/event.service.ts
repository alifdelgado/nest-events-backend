import { Repository } from 'typeorm';
import { Logger, Injectable } from '@nestjs/common';
import { EventEntity } from './event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendeeAnswerEnum } from './attendee.entity';
import { ListEvents, WhenEventFilter } from './input/list.event';

@Injectable()
export class EventService {
  private readonly logger = new Logger(EventService.name);
  constructor(
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
  ) {}

  private getEventsBaseQuery() {
    return this.eventRepository.createQueryBuilder('e').orderBy('e.id', 'DESC');
  }

  public getEventsWithAttendeeCountQuery() {
    return this.getEventsBaseQuery()
      .loadRelationCountAndMap('e.attendeeCount', 'e.attendees')
      .loadRelationCountAndMap(
        'e.attendeeAccepted',
        'e.attendees',
        'attendee',
        (qb) =>
          qb.where('attendee.answer = :answer', {
            answer: AttendeeAnswerEnum.Accepted,
          }),
      )
      .loadRelationCountAndMap(
        'e.attendeeMaybe',
        'e.attendees',
        'attendee',
        (qb) =>
          qb.where('attendee.answer = :answer', {
            answer: AttendeeAnswerEnum.Maybe,
          }),
      )
      .loadRelationCountAndMap(
        'e.attendeeRejected',
        'e.attendees',
        'attendee',
        (qb) =>
          qb.where('attendee.answer = :answer', {
            answer: AttendeeAnswerEnum.Rejected,
          }),
      );
  }

  public async getEventsWithAttendeeCountFiltered(filter?: ListEvents) {
    let query = this.getEventsWithAttendeeCountQuery();
    if (!filter) {
      return query.getMany();
    }

    if (filter.when) {
      if (filter.when == WhenEventFilter.Today) {
        query = query.andWhere(
          `e.when >= CURDATE() AND e.when<= CURDATE() + INTERVAL 1 DAY`,
        );
      }
      if (filter.when == WhenEventFilter.Tomorrow) {
        query = query.andWhere(
          `e.when >= CURDATE() + INTERVAL 1 DAY AND e.when<= CURDATE() + INTERVAL 1 DAY`,
        );
      }
      if (filter.when == WhenEventFilter.ThisWeek) {
        query = query.andWhere('YEARWEEK(e.when, 1) = YEARWEEK(CURDATE(), 1)');
      }
      if (filter.when == WhenEventFilter.NextWeek) {
        query = query.andWhere(
          'YEARWEEK(e.when, 1) = YEARWEEK(CURDATE(), 1 + 1)',
        );
      }
    }

    return await query.getMany();
  }

  public async getEvent(id: number): Promise<EventEntity> {
    const query = this.getEventsWithAttendeeCountQuery().andWhere(
      'e.id = :id',
      { id },
    );
    this.logger.debug(await query.getSql());
    return await query.getOne();
  }
}
