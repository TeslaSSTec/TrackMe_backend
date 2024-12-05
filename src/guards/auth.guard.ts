import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { verifyJWT } from '../utilities';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    const validatedToken = type === 'Bearer' ? token : undefined;
    const verifyResult = await verifyJWT(validatedToken);
    if (verifyResult.isAuth == false) {
      throw new UnauthorizedException();
    }
    request['user'] = verifyResult.payload;
    return true;
  }
}
