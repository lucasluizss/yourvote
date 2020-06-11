import { injectable, inject } from 'tsyringe';

import UserDomain from '../../domain/user.domain';
import IUserService from '../../domain/services/IUserService';

import UserRepository from './user.repository';
import IUserRepository from '../../domain/repositories/IUserRepository';

@injectable()
export default class UserService implements IUserService {

	constructor(@inject(UserRepository.name) private readonly userRepository: IUserRepository) { }

	create(user: UserDomain): UserDomain {
		return this.userRepository.add(user);
	}

}
