export interface IAccountService {
	authenticate(email: string, password: string, ipAddress: any): Promise<string>;
}