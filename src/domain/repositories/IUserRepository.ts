import UserEntity, { IUserEntity } from './../entities/user.entity';
import IRepositoryBase from './IRepositoryBase';

export default interface IUserRepository extends IRepositoryBase<IUserEntity> {
	getByEmail(email: string): Promise<IUserEntity>;
}