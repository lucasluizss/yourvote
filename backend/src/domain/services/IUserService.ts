import { IUserEntity } from './../entities/user.entity';

interface IUserService {
	list(): Promise<IUserEntity[]>;
	getById(id: string): Promise<IUserEntity>;
	getByEmail(email: string): Promise<IUserEntity>;
	save(user: IUserEntity): Promise<IUserEntity>;
	update(user: IUserEntity): Promise<IUserEntity>;
	delete(id: string): Promise<boolean>;
}

export default IUserService;
