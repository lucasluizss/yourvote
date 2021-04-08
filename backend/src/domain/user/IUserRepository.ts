import { IUserEntity } from './IUserEntity';
import IRepositoryBase from '../base/IRepositoryBase';

export default interface IUserRepository extends IRepositoryBase<IUserEntity> {
  getByEmail(email: string): Promise<IUserEntity>;
}
