import { Injectable } from '@nestjs/common';
import {
  IUsers,
  ICreateUser,
  ICreateUserResponse,
  IGetUsersResponse,
  IUpdateUser,
} from './users.interface';

@Injectable()
export class UsersService {
  private users: IUsers[] = [
    {
      id: '1',
      username: 'Ahmed',
      email: 'ahmed@test.com',
      password: '12345',
      age: 25,
    },
    {
      id: '2',
      username: 'Sara',
      email: 'sara@test.com',
      password: '12345',
      age: 22,
    },
  ];
  // Get all users
  getUsers(): IGetUsersResponse {
    return {
      message: 'Users fetched successfully',
      data: this.users,
    };
  }

  // Get single user
  getUser(id: string): IUsers | undefined {
    return this.users.find((user) => user.id === id);
  }

  // Create user
  createUser(body: ICreateUser): ICreateUserResponse {
    const newUser: IUsers = {
      ...body,
      id: Date.now().toString(),
    };
    this.users.push(newUser);
    return {
      message: 'User created successfully',
      data: newUser,
    };
  }

  // Update user
  updateUser(id: string, body: IUpdateUser): IUsers | undefined {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return undefined;
    this.users[index] = { ...this.users[index], ...body };
    return this.users[index];
  }

  // Delete user
  deleteUser(id: string): boolean {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }
}
