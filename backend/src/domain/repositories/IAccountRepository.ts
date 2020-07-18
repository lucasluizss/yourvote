import IAuthenticationHistory from '../entities/authentication-history.entity';

export default interface IAccountRepository {
	addAuthenticationHistory(accountData: IAuthenticationHistory): Promise<void>;
	updateLogout(token: string): Promise<void>;
}
