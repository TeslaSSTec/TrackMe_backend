import { IJWTPayload } from '../user/user.interface';
import { Request } from 'express';

export interface GuardedRequest extends Request {
  user: IJWTPayload;
}