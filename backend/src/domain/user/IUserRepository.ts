import { IUserEntity } from './user.entity';
import IRepositoryBase from '../base/IRepositoryBase';

export default interface IUserRepository extends IRepositoryBase<IUserEntity> {
	getByEmail(email: string): Promise<IUserEntity>;
}