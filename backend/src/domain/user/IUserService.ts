import IServiceBase from '../base/IServiceBase';
import { IUserEntity } from './IUserEntity';

export default interface IUserService extends IServiceBase<IUserEntity> {
  getByEmail(email: string): Promise<IUserEntity>;
}
