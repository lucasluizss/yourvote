import bcrypt from 'bcryptjs';

import { injectable, inject } from 'tsyringe';
import { AccountRepository } from './account.repository';
import { sign } from '../../infra/core/security';
import { IAccountService } from '../../domain/services/IAccountService';
import { IAccountRepository } from '../../domain/repositories/IAccountRepository';
import Result from '../../infra/core/factories/result.factory';

@injectable()
export default class AccountService implements IAccountService {

	constructor(@inject(AccountRepository.name) private readonly accountRepository: IAccountRepository) { }

	async authenticate(email: string, password: string, ipAddress: any): Promise<Result> {
		const account = await this.accountRepository.getByEmail(email);

    if (!account || !bcrypt.compareSync(password, account.password)) {
        Result.Fail('Email or password is incorrect');
    }

    const jwtToken = sign(account.id);

		return Result.Success(jwtToken);
	}
}