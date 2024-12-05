import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from './config';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { RecordModule } from './record/record.module';
import { SubscriberModule } from './subscriber/subscriber.module';
import { Record } from './record/record.entity';
import { Subscriber } from './subscriber/subscriber.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      entities: [User, Record, Subscriber],
      synchronize: true,
    }),
    UserModule,
    RecordModule,
    SubscriberModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
