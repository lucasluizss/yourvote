import UserDomain from "../../domain/user.domain";

interface IUserService {
	create(user: UserDomain): UserDomain;
}

export default IUserService;