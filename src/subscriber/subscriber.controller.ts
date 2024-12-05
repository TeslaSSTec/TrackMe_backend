import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { GuardedRequest } from '../guards/auth.interface';
import { SubscribeDTOType } from './subscriber.interface';
import { verifyJWT } from '../utilities';
import { SubscriberService } from './subscriber.service';

@Controller('subscriber')
export class SubscriberController {
  constructor(private readonly subscriberService: SubscriberService) {}

  @Post()
  @UseGuards(AuthGuard)
  async subscribe(@Req() req: GuardedRequest, @Body() data: SubscribeDTOType) {
    const payload = await verifyJWT(data.token);
    if (
      payload.payload.type != 'Subscribe' ||
      payload.payload.id == req.user.id
    ) {
      throw new BadRequestException('Неверный токен');
    }

    await this.subscriberService.createSubscriber(
      payload.payload.id,
      req.user.id,
    );
  }

  @Get()
  @UseGuards(AuthGuard)
  async getSubscribers(@Req() req: GuardedRequest) {
    const subs = await this.subscriberService.getSubscribers(req.user.id);
    return subs.map((x) => ({
      subId: x.subscriber.id,
      login: x.subscriber.login,
    }));
  }

  @Get('targets')
  @UseGuards(AuthGuard)
  async getSubTargets(@Req() req: GuardedRequest) {
    const subs = await this.subscriberService.getTargets(req.user.id);
    return subs.map((x) => ({
      targetId: x.user.id,
      login: x.user.login,
    }));
  }

  @Post('token')
  @UseGuards(AuthGuard)
  async getSubToken(@Req() req: GuardedRequest) {
    return {
      token: await this.subscriberService.generateTokenForSub(req.user.id),
    };
  }
}
