import { container } from 'tsyringe';

import IUserRepository from '../../domain/repositories/IUserRepository';
import UserRepository from '../../modules/user/user.repository';

container.registerSingleton<IUserRepository>(UserRepository.name, UserRepository);
