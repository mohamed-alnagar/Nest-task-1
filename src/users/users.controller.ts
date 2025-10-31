import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type {
  ICreateUser,
  ICreateUserResponse,
  IUsersResponse,
  IGetUsersResponse,
  IUpdateUser,
  IDeleteUserResponse,
} from './users.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/')
  getUsers(): IGetUsersResponse {
    return this.userService.getUsers();
  }

  @Get('/:id')
  getUser(@Param('id') id: string): IUsersResponse {
    const user = this.userService.getUser(id);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'User fetched successfully',
      data: user,
    };
  }

  @Post('/')
  createUser(@Body() body: ICreateUser): ICreateUserResponse {
    if (!body?.username || !body?.email || !body?.password) {
      throw new HttpException(
        'Missing required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.userService.createUser(body);
  }

  @Put('/:id')
  updateUser(
    @Param('id') id: string,
    @Body() body: IUpdateUser,
  ): IUsersResponse {
    const updated = this.userService.updateUser(id, body);
    if (!updated) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'User updated successfully',
      data: updated,
    };
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string): IDeleteUserResponse {
    const deleted = this.userService.deleteUser(id);
    if (!deleted) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return {
      message: 'User deleted successfully',
      id,
    };
  }
}
