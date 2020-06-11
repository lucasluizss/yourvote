import UserDomain from '../user.domain';

export default interface IUserRepository {
	add(user: UserDomain): UserDomain;
}