import AuthenticationHistoryContext from '../../database/models/authentication-history.model';
import IAccountRepository from '../../domain/repositories/IAccountRepository';
import IAuthenticationHistory from '../../domain/entities/authentication-history.entity';
import { uuid } from 'uuidv4';

export default class AccouuntRepository implements IAccountRepository {
	async addAuthenticationHistory({ userId, loginDate, ip, token, device }: IAuthenticationHistory): Promise<void> {
		await AuthenticationHistoryContext.updateMany({ userId: userId, logoutDate: undefined }, { logoutDate: new Date() })

		await AuthenticationHistoryContext.create({
			_id: uuid(),
			userId,
			loginDate,
			ip,
			token,
			device
		})
	}

	async updateLogout(token: string): Promise<void> {
		await AuthenticationHistoryContext.findOneAndUpdate({ token: token }, { logoutDate: new Date() });
	}
}