import bcrypt from 'bcryptjs';
import { injectable, inject } from 'tsyringe';
import UserRepository from '../user/user.repository';
import AccouuntRepository from './account.repository';
import { ERole } from '../../domain/enums/Roles.enum';
import { EStatus } from '../../domain/enums/Status.enum';
import UserEntity from '../../domain/user/user.entity';
import { generateJtwToken } from '../../infra/core/security';
import { verifyJwtToken } from './../../infra/core/security/index';
import IUserRepository from '../../domain/user/IUserRepository';
import { IAccountService } from '../../domain/account/IAccountService';
import { forgot_password } from './../../infra/shared/templates/email.template';
import IEmailService, { EmailService } from './../../infra/shared/EmailService';
import IAccouuntRepository from '../../domain/account/IAccountRepository';
import IAuthenticationHistory from '../../domain/account/authentication-history.entity';

@injectable()
export default class AccountService implements IAccountService {

	constructor(
		@inject(UserRepository.name) private readonly _userRepository: IUserRepository,
		@inject(AccouuntRepository.name) private readonly _accountRepository: IAccouuntRepository,
		@inject(EmailService.name) private readonly _emailService: IEmailService
	) { }

	async authenticate(email: string, password: string, ipAddress: any, device: string): Promise<string> {
		const user = await this._userRepository.getByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new Error('Email or password is incorrect');
		} else if (user.status === EStatus.Inactive) {
			throw new Error('You need active your account first, please contact your admin.');
		}

		const token = generateJtwToken(user._id);

		const accountData = {
			userId: user._id,
			loginDate: new Date(),
			ip: ipAddress,
			device: device,
			token: token
		} as IAuthenticationHistory;

		await this._accountRepository.addAuthenticationHistory(accountData);

		return token;
	}

	async logout(token: string): Promise<void> {
		await this._accountRepository.updateLogout(token);
	}

	async confirmEmail(token: string): Promise<boolean> {
		const userId = await verifyJwtToken(token);

		const user = await this._userRepository.getById(userId);

		const userEntity = UserEntity.create(user, user._id);

		userEntity.confirmEmail();

		await this._userRepository.update(userEntity.getProps());

		return true;
	}

	async activeUser(id: string): Promise<boolean> {
		const userId = await verifyJwtToken(id);

		const user = await this._userRepository.getById(userId);

		const userEntity = UserEntity.create(user, user._id);

		userEntity.active();

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

	async forgotPassword(email: string): Promise<void> {
		const user = await this._userRepository.getByEmail(email);

		if (user) {
			const tokenEmail = generateJtwToken(user._id, '15m');

			this._emailService.send(email, 'Nova Senha', forgot_password(user.name, tokenEmail));
		} else {
			throw new Error('User is not registered in the system.')
		}
	}

	async resetPassword(email: string, password: string): Promise<boolean> {
		const user = await this._userRepository.getByEmail(email);

		const userEntity = UserEntity.create(user, user._id);

		userEntity.setEncriptedPassword(bcrypt.hashSync(password, 10));

		await this._userRepository.update(userEntity.getProps());

		return true;
	}
}