import UserDomain from "../../domain/user.domain";

export default interface IUserRepository {
	add(user: UserDomain): UserDomain;
}