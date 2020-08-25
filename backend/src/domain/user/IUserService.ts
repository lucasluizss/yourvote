import IServiceBase from '../base/IServiceBase';
import { IUserEntity } from './user.entity';

interface IUserService extends IServiceBase<IUserEntity> {
	getByEmail(email: string): Promise<IUserEntity>;
}

export default IUserService;
