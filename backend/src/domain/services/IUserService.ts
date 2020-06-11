import UserDomain from '../user.domain';

interface IUserService {
	create(user: UserDomain): UserDomain;
}

export default IUserService;