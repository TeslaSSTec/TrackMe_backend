import { Module } from '@nestjs/common';
import { RecordController } from './record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from './record.entity';
import { RecordService } from './record.service';
import { SubscriberModule } from '../subscriber/subscriber.module';

@Module({
  controllers: [RecordController],
  imports: [TypeOrmModule.forFeature([Record]), SubscriberModule],
  providers: [RecordService],
})
export class RecordModule {}
