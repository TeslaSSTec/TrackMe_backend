import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Record {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  userId: string;

  @Column({ nullable: false, type: 'double precision' })
  lat: number;

  @Column({ nullable: false, type: 'double precision' })
  lon: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  user: User;
}
