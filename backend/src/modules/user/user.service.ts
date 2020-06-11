import UserEntity, { IUserEntity } from './../../domain/entities/user.entity';
import { injectable, inject } from 'tsyringe';
import bcrypt from 'bcryptjs';

import IUserService from '../../domain/services/IUserService';

import UserRepository from './user.repository';
import IUserRepository from '../../domain/repositories/IUserRepository';
import { EStatus } from '../../domain/enums/Status.enum';

@injectable()
export default class UserService implements IUserService {

	constructor(@inject(UserRepository.name) private readonly _userRepository: IUserRepository) { }

	async getById(id: string): Promise<IUserEntity> {
		const user = await this._userRepository.getById(id);

		delete user.password;

		return user;
	}

	async getByEmail(email: string): Promise<IUserEntity> {
		const user = await this._userRepository.getByEmail(email);

		delete user.password;

		return user;
	}

	async save(user: IUserEntity): Promise<IUserEntity> {
		const userEntity = UserEntity.create(user);

		userEntity.setEncriptedPassword(bcrypt.hashSync(user.password, 10));
		userEntity.inactive();

		await this._userRepository.save(userEntity.getProps());

		return user;
	}

	async update(user: IUserEntity): Promise<IUserEntity> {
		await this._userRepository.update(user);

		delete user.password;

		return user;
	}

	async delete(id: string): Promise<boolean> {
		await this._userRepository.delete(id);
		return true;
	}
}
