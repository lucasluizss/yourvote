import { IAuthRepository } from './../../domain/repositories/IAuthRepository';

export class AuthRepository implements IAuthRepository {
	getByEmail(email: string) {
		throw new Error('Method not implemented.');
	}
}