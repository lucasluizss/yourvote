import { IUserEntity } from '../../../domain/user/user.entity';

export default class UserFactory {
	static create(user: IUserEntity): any {
		return {
			id: user._id,
			username: user.username,
			name: user.name,
			email: user.email,
			phone: user.phone,
			status: user.status,
			role: user.role
		}
	}
}