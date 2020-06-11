import bcrypt from 'bcryptjs';

import { injectable, inject } from 'tsyringe';
import { sign } from '../../infra/core/security';
import { IAccountService } from '../../domain/services/IAccountService';
import Result from '../../infra/core/factories/result.factory';
import UserRepository from '../user/user.repository';
import IUserRepository from '../../domain/repositories/IUserRepository';

@injectable()
export default class AccountService implements IAccountService {

	constructor(@inject(UserRepository.name) private readonly userRepository: IUserRepository) { }

	async authenticate(email: string, password: string, ipAddress: any): Promise<string> {
		const account = await this.userRepository.getByEmail(email);

    if (!account || !bcrypt.compareSync(password, account.password)) {
        Result.Fail('Email or password is incorrect');
    }

		const jwtToken = sign(account.id);

		return jwtToken;
	}
}