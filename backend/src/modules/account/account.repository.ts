import UserEntity, { IUserEntity } from './../../domain/entities/user.entity';
import { IAccountRepository } from '../../domain/repositories/IAccountRepository';
import UserContext from '../../database/models/user.model';

export class AccountRepository implements IAccountRepository {

	async get(id: string): Promise<IUserEntity> {
		return await UserContext.findById(id) as IUserEntity;
	}

	async getByEmail(email: string): Promise<IUserEntity> {
		return await UserContext.findOne({ email }) as IUserEntity;
	}

	async save(user: IUserEntity): Promise<IUserEntity> {
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