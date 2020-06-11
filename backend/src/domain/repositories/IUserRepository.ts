import UserDomain from '../entities/user.entity';

export default interface IUserRepository {
	add(user: UserDomain): UserDomain;
}