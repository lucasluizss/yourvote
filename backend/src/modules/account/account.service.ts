import bcrypt from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import UserRepository from '../user/user.repository';
import AccouuntRepository from './account.repository';
import { ERole } from '../../domain/enums/Roles.enum';
import { EStatus } from '../../domain/enums/Status.enum';
import UserEntity from '../../domain/user/user.entity';
import { IUserEntity } from '../../domain/user/IUserEntity';
import { generateJtwToken } from '../../infra/core/security';
import { verifyJwtToken } from './../../infra/core/security/index';
import IUserRepository from '../../domain/user/IUserRepository';
import { IAccountService } from '../../domain/account/IAccountService';
import { forgot_password } from '../../infra/shared/templates/email.templates';
import IEmailService, { EmailService } from './../../infra/shared/EmailService';
import IAccouuntRepository from '../../domain/account/IAccountRepository';
import IAuthenticationHistory from '../../domain/account/authentication-history.entity';

const FIFTEEN_MINUTES = '15m';

@injectable()
export default class AccountService implements IAccountService {
  constructor(
    @inject(UserRepository.name)
    private readonly userRepository: IUserRepository,
    @inject(AccouuntRepository.name)
    private readonly accountRepository: IAccouuntRepository,
    @inject(EmailService.name)
    private readonly emailService: IEmailService,
  ) {}

  async authenticate(
    email: string,
    password: string,
    ipAddress: any,
    device: string,
  ): Promise<string> {
    const user = await this.userRepository.getByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new Error('Email ou senha incorreto');
    } else if (user.status === EStatus.Inactive) {
      throw new Error(
        'Você precisa ativar sua conta primeiro. Contacte um administrador.',
      );
    }

    const token = generateJtwToken(user._id);

    const accountData = {
      userId: user._id,
      loginDate: new Date(),
      ip: ipAddress,
      device: device,
      token: token,
    } as IAuthenticationHistory;

    await this.accountRepository.addAuthenticationHistory(accountData);

    return token;
  }

  async getUserByEmail(email: string): Promise<IUserEntity> {
    return await this.userRepository.getByEmail(email);
  }

  async logout(token: string): Promise<void> {
    await this.accountRepository.updateLogout(token);
  }

  async confirmEmail(token: string): Promise<boolean> {
    const userId = await verifyJwtToken(token);

    const user = await this.userRepository.getById(userId);

    const userEntity = UserEntity.create(user, user._id);

    userEntity.confirmEmail();

    await this.userRepository.update(userEntity.getProps());

    return true;
  }

  async activeUser(id: string): Promise<boolean> {
    const user = await this.userRepository.getById(id);

    const userEntity = UserEntity.create(user, user._id);

    if (userEntity.isActive()) {
      userEntity.inactive();
    } else {
      userEntity.active();
    }

    await this.userRepository.update(userEntity.getProps());

    return true;
  }

  async makeAdmin(id: string): Promise<boolean> {
    const user = await this.userRepository.getById(id);

    const userEntity = UserEntity.create(user, id);

    userEntity.setRole(ERole.Admin);

    await this.userRepository.update(userEntity.getProps());

    return true;
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.userRepository.getByEmail(email);

    if (user) {
      const tokenEmail = generateJtwToken(user._id, FIFTEEN_MINUTES);

      this.emailService.send(
        email,
        'Nova Senha',
        forgot_password(user.name, tokenEmail),
      );
    } else {
      throw new Error('Usuário não encontrado');
    }
  }

  async resetPassword(email: string, password: string): Promise<boolean> {
    const user = await this.userRepository.getByEmail(email);

    const userEntity = UserEntity.create(user, user._id);

    userEntity.setEncriptedPassword(bcrypt.hashSync(password, 10));

    await this.userRepository.update(userEntity.getProps());

    return true;
  }
}
