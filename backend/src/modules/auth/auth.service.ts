import bcrypt from 'bcryptjs';

import { injectable, inject } from 'tsyringe';
import { AuthRepository } from './auth.repository';
import { sign } from '../../infra/core/security';
import { IAuthService } from './../../domain/services/IAuthService';
import { IAuthRepository } from './../../domain/repositories/IAuthRepository';

@injectable()
export default class AuthService implements IAuthService {

	constructor(@inject(AuthRepository.name) private readonly authRepository: IAuthRepository) { }

	async authenticate(email: string, password: string, ipAddress: any): Promise<any> {
		const account = await this.authRepository.getByEmail(email);

    if (!account || !bcrypt.compareSync(password, account.passwordHash)) {
        throw 'Email or password is incorrect';
    }

    const jwtToken = sign(account.id);

		return { jwtToken };
	}
}