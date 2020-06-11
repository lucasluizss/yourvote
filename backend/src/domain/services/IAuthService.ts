export interface IAuthService {
	authenticate(email: string, password: string, ipAddress: any): Promise<any>;
}