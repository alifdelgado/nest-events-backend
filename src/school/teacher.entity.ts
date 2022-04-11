import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { SubjectEntity } from './subject.entity';

@Entity('teachers')
export class TeacherEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => SubjectEntity, (subject) => subject)
  subjects: SubjectEntity[];
}
