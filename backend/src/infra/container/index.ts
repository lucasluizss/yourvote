import { AuthRepository } from './../../modules/auth/auth.repository';
import { IAuthRepository } from './../../domain/repositories/IAuthRepository';
import { container } from 'tsyringe';

import IUserRepository from '../../domain/repositories/IUserRepository';
import UserRepository from '../../modules/user/user.repository';

container.registerSingleton<IUserRepository>(UserRepository.name, UserRepository);
container.registerSingleton<IAuthRepository>(AuthRepository.name, AuthRepository);
