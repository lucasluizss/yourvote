import { AccountRepository } from '../../modules/account/account.repository';
import { IAccountRepository } from '../../domain/repositories/IAccountRepository';
import { container } from 'tsyringe';

import IUserRepository from '../../domain/repositories/IUserRepository';
import UserRepository from '../../modules/user/user.repository';

container.registerSingleton<IUserRepository>(UserRepository.name, UserRepository);
container.registerSingleton<IAccountRepository>(AccountRepository.name, AccountRepository);
