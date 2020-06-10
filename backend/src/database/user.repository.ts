import IUserRepository from "../infra/repositories/user.repository";
import UserDomain from "../domain/user.domain";

export default class UserRepository implements IUserRepository {
	private users: any[];

	constructor() {
		this.users = new Array<any>();
	}

	add(user: UserDomain): UserDomain {
		const userData = {
			username: user.getUsername(),
			name: user.getName(),
			email: user.getEmail()
		};

		if (!this.users.some((i: any) => i.name === userData.name)) {
			this.users.push(userData);
		} else {
			throw new Error(`${userData.name} already added!`);
		}

		return user;
	}

}