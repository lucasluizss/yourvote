export interface IAccountService {
	authenticate(email: string, password: string, ipAddress: any): Promise<string>;
	makeAdmin(id: string): Promise<boolean>;
	confirmEmail(token: string): Promise<boolean>;
}