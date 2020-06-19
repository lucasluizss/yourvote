import { IUserEntity } from './../../domain/entities/user.entity';
import IUserRepository from '../../domain/repositories/IUserRepository';
import UserContext from '../../database/models/user.model';
import { uuid } from 'uuidv4';

export default class UserRepository implements IUserRepository {

	async list(): Promise<IUserEntity[]> {
		return await UserContext.find();
	}

	async getById(id: string): Promise<IUserEntity> {
		return await UserContext.findById(id) as IUserEntity;
	}

	async getByEmail(email: string): Promise<IUserEntity> {
		return await UserContext.findOne({ email }) as IUserEntity;
	}

	async save(user: IUserEntity): Promise<IUserEntity> {
		user._id = uuid();
		return await UserContext.create(user) as IUserEntity;
	}

	async update(user: IUserEntity): Promise<IUserEntity> {
		return await UserContext.findByIdAndUpdate(user.id, user) as IUserEntity;
	}

	async delete(id: string): Promise<boolean> {
		await UserContext.findByIdAndDelete(id);
		return true;
	}
}