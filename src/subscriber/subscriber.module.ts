import { Module } from '@nestjs/common';
import { SubscriberController } from './subscriber.controller';
import { SubscriberService } from './subscriber.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscriber } from './subscriber.entity';

@Module({
  controllers: [SubscriberController],
  providers: [SubscriberService],
  imports: [TypeOrmModule.forFeature([Subscriber])],
  exports: [SubscriberService],
})
export class SubscriberModule {}
