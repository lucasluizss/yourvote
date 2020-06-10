import { container } from 'tsyringe';

import IUserRepository from '../repositories/user.repository';
import UserRepository from '../../database/user.repository';

container.registerSingleton<IUserRepository>(UserRepository.name, UserRepository);
