import bcrypt from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import UserRepository from './user.repository';
import { ERole } from '../../domain/enums/Roles.enum';
import environment from '../../environment/environment';
import IUserService from '../../domain/user/IUserService';
import IUserRepository from '../../domain/user/IUserRepository';
import { generateJtwToken } from './../../infra/core/security/index';
import UserEntity, { IUserEntity } from '../../domain/user/user.entity';
import IEmailService, { EmailService } from '../../infra/shared/EmailService';
import { new_user_template } from '../../infra/shared/templates/email.templates';

@injectable()
export default class UserService implements IUserService {

	constructor(
		@inject(UserRepository.name) private readonly _userRepository: IUserRepository,
		@inject(EmailService.name) private readonly _emailService: IEmailService
	) { }

	async list(): Promise<IUserEntity[]> {
		return await this._userRepository.list();
	}

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

		if (environment.Admins.includes(userEntity.email)) {
			userEntity.setRole(ERole.Admin);
			userEntity.active();
		} else {
			userEntity.setRole(ERole.User);
			userEntity.inactive();
		}

		user = await this._userRepository.save(userEntity.getProps());

		const tokenEmail = generateJtwToken(user._id, '30m');

		this._emailService.send(user.email,
			`${user.name}, bem vindo ao YourVote`,
			new_user_template(user.name, tokenEmail)
		);

		return user;
	}

	async update(user: IUserEntity): Promise<IUserEntity> {
		const userEntity = UserEntity.create(user, user.id);

		if (userEntity.password) {
			userEntity.setEncriptedPassword(bcrypt.hashSync(user.password, 10));
		}

		return await this._userRepository.update(userEntity.getProps());
	}

	async delete(id: string): Promise<boolean> {
		return await this._userRepository.delete(id);
	}
}
