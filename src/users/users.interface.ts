export interface IUsers {
  id: string;
  username: string;
  email: string;
  password: string;
  age?: number;
}

export interface ICreateUser {
  username: string;
  email: string;
  password: string;
  age?: number;
}

export interface IUpdateUser {
  username?: string;
  email?: string;
  password?: string;
  age?: number;
}

export interface ICreateUserResponse {
  message: string;
  data: IUsers;
}

export interface IGetUsersResponse {
  message: string;
  data: IUsers[];
}

export interface IUsersResponse {
  message: string;
  data: IUsers;
}

export interface IDeleteUserResponse {
  message: string;
  id: string;
}
