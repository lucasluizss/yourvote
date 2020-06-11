import { container } from 'tsyringe';
import AuthService from './account.service';
import { Request, Response } from "express";
import Result from '../../infra/core/factories/result.factory';

class AuthController {

	async authenticate(request: Request, response: Response) {
		const { email, password, ipAddress = request.ip } = request.body;

		const authService = container.resolve(AuthService);

		const { jwtToken } = await authService.authenticate(email, password, ipAddress);

    return response.json(Result.Success({ token: jwtToken }));
	}
}

export default new AuthController();
