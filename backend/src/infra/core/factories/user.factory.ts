import { EStatus } from './../../../domain/enums/Status.enum';
import { IUserEntity } from './../../../domain/entities/user.entity';
import { ERole } from '../../../domain/enums/Roles.enum';

export default class UserFactory {
	static create(user: IUserEntity): any {
		return {
			id: user._id,
			username: user.username,
			name: user.name,
			email: user.email,
			phone: user.phone,
			status: EStatus[user.status],
			role: ERole[user.role]
		}
	}
}