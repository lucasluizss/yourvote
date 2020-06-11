export interface IAuthRepository {
	getByEmail(email: string): any;
}