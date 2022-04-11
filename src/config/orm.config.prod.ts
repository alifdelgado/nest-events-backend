import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EventEntity } from '../event/event.entity';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [EventEntity],
    synchronize: false,
  }),
);
