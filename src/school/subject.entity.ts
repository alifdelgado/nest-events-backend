import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { TeacherEntity } from './teacher.entity';

@Entity('subjects')
export class SubjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => TeacherEntity, (teacher) => teacher.subjects, {
    cascade: true,
  })
  subjects: TeacherEntity[];
}
