import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
@Unique(['userIdRef', 'subscriberIdRef'])
export class Subscriber {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id_ref', nullable: false })
  userIdRef: string;

  @Column({ name: 'subscriber_id_ref', nullable: false })
  subscriberIdRef: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id_ref', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'subscriber_id_ref', referencedColumnName: 'id' })
  subscriber: User;
}
