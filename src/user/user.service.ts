import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateUserDto, IJWTPayload, UserDataDTO } from './user.interface';
import { ERROR_MESSAGES } from '../errors.const';
import { checkPasswordHash, hashPassword, signJWT } from '../utilities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(user: CreateUserDto): Promise<void> {
    const foundUser = await this.usersRepository.findOneBy({
      login: user.login,
    });
    if (foundUser) {
      throw new BadRequestException(ERROR_MESSAGES.RU.LOGIN_OCCUPIED);
    }

    const passHash = await hashPassword(user.password);
    const newUser = new User();
    newUser.login = user.login;
    newUser.passHash = passHash;
    try {
      await this.usersRepository.insert(newUser);
    } catch (e) {
      if (e instanceof QueryFailedError && e.driverError.code == '23505') {
        throw new BadRequestException(ERROR_MESSAGES.RU.LOGIN_OCCUPIED);
      }
      throw e;
    }
  }

  async authUser(user: CreateUserDto): Promise<string> {
    const foundUser = await this.usersRepository.findOneBy({
      login: user.login,
    });
    if (!foundUser) {
      throw new BadRequestException(ERROR_MESSAGES.RU.WRONG_CREDENTIALS);
    }
    if (!(await checkPasswordHash(foundUser.passHash, user.password))) {
      throw new BadRequestException(ERROR_MESSAGES.RU.WRONG_CREDENTIALS);
    }
    const jwtPayload: IJWTPayload = {
      type: 'Auth',
      id: foundUser.id,
      login: foundUser.login,
    };
    return await signJWT(jwtPayload);
  }

  async getUserData(userId: string): Promise<UserDataDTO> {
    const foundUser = await this.usersRepository.findOneBy({
      id: userId,
    });
    if (!foundUser) {
      throw new UnauthorizedException();
    }
    return { id: foundUser.id, login: foundUser.login };
  }

  async deleteUser(userId: string, userPass: string) {
    const foundUser = await this.usersRepository.findOneBy({ id: userId });
    if (!foundUser) {
      throw new BadRequestException(ERROR_MESSAGES.RU.WRONG_CREDENTIALS);
    }
    if (!(await checkPasswordHash(foundUser.passHash, userPass))) {
      throw new BadRequestException(ERROR_MESSAGES.RU.WRONG_CREDENTIALS);
    }
    await this.usersRepository.delete({ id: userId });
  }
}
