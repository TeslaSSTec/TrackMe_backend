import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RecordService } from './record.service';
import { CreateRecordDto, IRecordDto } from './record.interface';
import { GuardedRequest } from '../guards/auth.interface';
import { AuthGuard } from '../guards/auth.guard';

@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createRecord(
    @Body() createRecord: CreateRecordDto,
    @Req() req: GuardedRequest,
  ) {
    await this.recordService.CreateRecord(
      createRecord.lat,
      createRecord.lon,
      req.user.id,
    );
  }

  @Get()
  @UseGuards(AuthGuard)
  async getRecords(@Req() req: GuardedRequest): Promise<IRecordDto[]> {
    return this.recordService.GetRecords(req.user.id);
  }

  @Get(':target')
  @UseGuards(AuthGuard)
  async getTargetRecords(
    @Req() req: GuardedRequest,
    @Param('target') target: string,
  ): Promise<IRecordDto[]> {
    return this.recordService.GetTargetRecords(req.user.id, target);
  }
}
