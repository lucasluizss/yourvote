import { verifyJwtToken } from './../../infra/core/security/index';
import bcrypt from 'bcryptjs';
import { injectable, inject } from 'tsyringe';
import { generateJtwToken } from '../../infra/core/security';
import { IAccountService } from '../../domain/services/IAccountService';
import UserRepository from '../user/user.repository';
import IUserRepository from '../../domain/repositories/IUserRepository';
import UserEntity from '../../domain/entities/user.entity';
import { ERole } from '../../domain/enums/Roles.enum';

@injectable()
export default class AccountService implements IAccountService {

	constructor(@inject(UserRepository.name) private readonly _userRepository: IUserRepository) { }

	async authenticate(email: string, password: string, ipAddress: any): Promise<string> {
		const user = await this._userRepository.getByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
        throw new Error('Email or password is incorrect');
		}

		return generateJtwToken(user._id);
	}

	async confirmEmail(token: string): Promise<boolean> {
		const userId = await verifyJwtToken(token);

		const user = await this._userRepository.getById(userId);

		const userEntity = UserEntity.create(user, user.id);

		userEntity.confirmEmail();

		await this._userRepository.update(userEntity.getProps());

		return true;
	}

	async makeAdmin(id: string): Promise<boolean> {
		const user = await this._userRepository.getById(id);

		const userEntity = UserEntity.create(user, id);

		userEntity.setRole(ERole.Admin);

		await this._userRepository.update(userEntity.getProps());

		return true;
	}
}