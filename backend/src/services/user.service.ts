import { injectable, inject } from 'tsyringe';

import UserDomain from "../domain/user.domain";
import IUserService from "../infra/services/user.service";

import UserRepository from '../database/user.repository';
import IUserRepository from '../infra/repositories/user.repository';

@injectable()
export default class UserService implements IUserService {

	constructor(@inject(UserRepository.name) private readonly userRepository: IUserRepository) { }

	create(user: UserDomain): UserDomain {
		return this.userRepository.add(user);
	}

}
