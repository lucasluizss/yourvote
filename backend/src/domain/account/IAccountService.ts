import { IUserEntity } from "../user/IUserEntity";

export interface IAccountService {
  authenticate(
    email: string,
    password: string,
    ipAddress: any,
    device: string,
  ): Promise<string>;
  getUserByEmail(email: string): Promise<IUserEntity>;
  logout(token: string): Promise<void>;
  makeAdmin(id: string): Promise<boolean>;
  confirmEmail(token: string): Promise<boolean>;
  forgotPassword(email: string): Promise<void>;
}
