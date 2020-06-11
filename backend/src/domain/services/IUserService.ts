import UserDomain from '../entities/user.entity';

interface IUserService {
	create(user: UserDomain): UserDomain;
}

export default IUserService;