import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscriber } from './subscriber.entity';
import { Repository } from 'typeorm';
import { signJWT } from '../utilities';

@Injectable()
export class SubscriberService {
  constructor(
    @InjectRepository(Subscriber)
    private subscribeRepository: Repository<Subscriber>,
  ) {}

  async createSubscriber(userID: string, subID: string): Promise<void> {
    await this.subscribeRepository.save({
      userIdRef: userID,
      subscriberIdRef: subID,
    });
  }

  async getSubscribers(userID: string) {
    return await this.subscribeRepository.find({
      where: { userIdRef: userID },
      relations: { subscriber: true },
    });
  }

  async getTargets(userID: string) {
    return await this.subscribeRepository.find({
      where: { subscriberIdRef: userID },
      relations: { user: true },
    });
  }

  async generateTokenForSub(userID: string) {
    return await signJWT({ id: userID, type: 'Subscribe', login: '' });
  }

  async checkSub(subId, targetId) {
    return !!(await this.subscribeRepository.findOneBy({
      userIdRef: targetId,
      subscriberIdRef: subId,
    }));
  }
}
