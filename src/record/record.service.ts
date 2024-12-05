import { BadRequestException, Injectable } from '@nestjs/common';
import { Record } from './record.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRecordDto } from './record.interface';
import { SubscriberService } from '../subscriber/subscriber.service';

@Injectable()
export class RecordService {
  constructor(
    @InjectRepository(Record)
    private recordRepository: Repository<Record>,
    private readonly subscriberService: SubscriberService,
  ) {}

  async CreateRecord(lat: number, lon: number, userId: string) {
    const newRecord = this.recordRepository.create({ lat, lon, userId });
    await this.recordRepository.save(newRecord);
  }

  async GetRecords(userId: string): Promise<IRecordDto[]> {
    return await this.recordRepository.find({
      where: { userId: userId },
      order: { createdAt: 'DESC' },
    });
  }

  async GetTargetRecords(
    subId: string,
    targetId: string,
  ): Promise<IRecordDto[]> {
    if (!(await this.subscriberService.checkSub(subId, targetId))) {
      throw new BadRequestException('Вы не подписчик');
    }
    return await this.recordRepository.find({
      where: { userId: targetId },
      order: { createdAt: 'DESC' },
    });
  }
}
