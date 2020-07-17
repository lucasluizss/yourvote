import IServiceBase from './IServiceBase';
import { IUserEntity } from './../entities/user.entity';

interface IUserService extends IServiceBase<IUserEntity> {
	getByEmail(email: string): Promise<IUserEntity>;
}

export default IUserService;
