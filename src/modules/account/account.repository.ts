import IAccountRepository from '../../domain/repositories/IAccountRepository';
import IAuthenticationHistory from '../../domain/entities/authentication-history.entity';
import AuthenticationHistoryContext from '../../database/models/authentication-history.model';

export default class AccouuntRepository implements IAccountRepository {
	async addAuthenticationHistory({ userId, loginDate, ip, token, device }: IAuthenticationHistory): Promise<void> {
		await AuthenticationHistoryContext.updateMany({ userId: userId, logoutDate: undefined }, { logoutDate: new Date() })

		await AuthenticationHistoryContext.create({
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