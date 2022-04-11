import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EventEntity } from 'src/event/event.entity';
import { SubjectEntity } from 'src/school/subject.entity';
import { TeacherEntity } from 'src/school/teacher.entity';
import { AttendeeEntity } from 'src/event/attendee.entity';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [EventEntity, AttendeeEntity, SubjectEntity, TeacherEntity],
    synchronize: true,
  }),
);
