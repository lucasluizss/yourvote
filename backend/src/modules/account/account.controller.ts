import { container } from 'tsyringe';
import { Request, Response } from 'express';
import AccountService from './account.service';
import Result from '../../infra/core/factories/result.factory';

class AuthController {

	async authenticate(request: Request, response: Response) {
		const { email, password, ipAddress = request.ip, device = request.host } = request.body;

		try {
			const accountService = container.resolve(AccountService);

			const jwtToken = await accountService.authenticate(email, password, ipAddress, device);

			return response.json(Result.Success({ token: jwtToken }));

		} catch(error) {
			return response.json(Result.Fail(error.message));
		}
	}

	async logout(request: Request, response: Response) {
		const { authorization } = request.headers;

		try {
			const accountService = container.resolve(AccountService);

			await accountService.logout(String(authorization));

			return response.json(Result.Success());

		} catch(error) {
			return response.json(Result.Fail(error.message));
		}
	}

	async activeUser(request: Request, response: Response) {
		const { id } = request.params;

		try {
			const accountService = container.resolve(AccountService);

			await accountService.activeUser(id);

			return response.json(Result.Success());

		} catch(error) {
			return response.json(Result.Fail(error.message));
		}
	}

	async comfirmEmail(request: Request, response: Response) {
		const { token } = request.params;

		try {
			const accountService = container.resolve(AccountService);

			await accountService.confirmEmail(token);

			return response.json(Result.Success());

		} catch(error) {
			return response.json(Result.Fail(error.message));
		}
	}

	async makeAdmin(request: Request, response: Response) {
		const { id } = request.params;

		try {
			const accountService = container.resolve(AccountService);

			await accountService.makeAdmin(id);

			return response.json(Result.Success());

		} catch(error) {
			return response.json(Result.Fail(error.message));
		}
	}

	async forgotPassword(request: Request, response: Response) {
		const { email } = request.body;

		try {
			const accountService = container.resolve(AccountService);

			await accountService.forgotPassword(email);

			return response.json(Result.Success())
		} catch(error) {
			return response.json(Result.Fail(error.message));
		}
	}

	async resetPassword(request: Request, response: Response) {
		const { email, password, confirmPassword } = request.body;

		try {
			const accountService = container.resolve(AccountService);

			if (password !== confirmPassword) {
				return response.json(Result.Fail('Passwords do not match'));
			}

			await accountService.resetPassword(email, password);

			return response.json(Result.Success());
		} catch(error) {
			return response.json(Result.Fail(error.message));
		}
	}
}

export default new AuthController();
