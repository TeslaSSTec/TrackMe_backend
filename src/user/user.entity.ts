import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  login: string;

  @Column({ nullable: false })
  passHash: string;

  // @OneToMany(() => Subscriber, (sub) => sub.user)
  // subscribers: Subscriber;
  //
  // @OneToMany(() => Subscriber,(sub) => )

  @CreateDateColumn({ nullable: false })
  createdAt: Date;
}
