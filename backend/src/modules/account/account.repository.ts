import AuthenticationHistoryContext from '../../database/models/authentication-history.model';
import IAccountRepository from '../../domain/repositories/IAccountRepository';
import IAuthenticationHistory from '../../domain/entities/authentication-history.entity';

export default class AccouuntRepository implements IAccountRepository {
	async addAuthenticationHistory({ userId, loginDate, logoutDate, ip, token, device }: IAuthenticationHistory): Promise<void> {
		await AuthenticationHistoryContext.create({
			userId,
			loginDate,
			logoutDate,
			ip,
			token,
			device
		})
	}

	async updateLogout(token: string): Promise<void> {
		await AuthenticationHistoryContext.findOneAndUpdate({ token }, { logoutDate: new Date() });
	}
}