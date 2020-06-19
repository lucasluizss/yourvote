import IEmailService, { EmailService } from './../shared/EmailService';
import { container } from 'tsyringe';

import IUserRepository from '../../domain/repositories/IUserRepository';
import IAccouuntRepository from '../../domain/repositories/IAccountRepository';
import UserRepository from '../../modules/user/user.repository';
import AccouuntRepository from '../../modules/account/account.repository';

container.registerSingleton<IUserRepository>(UserRepository.name, UserRepository);
container.registerSingleton<IAccouuntRepository>(AccouuntRepository.name, AccouuntRepository);
container.registerSingleton<IEmailService>(EmailService.name, EmailService);
