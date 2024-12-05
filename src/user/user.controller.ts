import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto, DeleteAccountDto, UserDataDTO } from './user.interface';
import { UserService } from './user.service';
import { Response } from 'express';
import { AuthGuard } from '../guards/auth.guard';
import { GuardedRequest } from '../guards/auth.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getUserData(@Req() req: GuardedRequest): Promise<UserDataDTO> {
    return await this.userService.getUserData(req.user.id);
  }

  @Post()
  async signUp(@Body() createUser: CreateUserDto) {
    await this.userService.createUser(createUser);
  }

  @Post('auth')
  async auth(@Body() authUser: CreateUserDto, @Res() res: Response) {
    res
      .setHeader('X-Auth-Token', await this.userService.authUser(authUser))
      .send();
  }

  @Delete()
  @UseGuards(AuthGuard)
  async delete(
    @Body() deleteUser: DeleteAccountDto,
    @Req() req: GuardedRequest,
  ) {
    await this.userService.deleteUser(req.user.id, deleteUser.password);
  }
}
