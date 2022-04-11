import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AttendeeEntity } from 'src/event/attendee.entity';

@Entity('events')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  when: Date;

  @Column()
  address: string;

  @OneToMany(() => AttendeeEntity, (attendee) => attendee.event, {
    eager: true,
  })
  attendees: AttendeeEntity[];

  attendeeCount?: number;

  attendeeRejected?: number;

  attendeeMaybe?: number;

  attendeeAccepted?: number;
}
