import { IsNumber } from 'class-validator';

export class CreateRecordDto {
  @IsNumber()
  lat: number;

  @IsNumber()
  lon: number;
}

export interface IRecordDto extends CreateRecordDto {
  id: string;
  createdAt: Date;
  userId: string;
}