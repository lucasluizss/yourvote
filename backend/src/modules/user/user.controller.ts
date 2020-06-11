import { Request, Response } from "express";
import { container } from 'tsyringe';
import UserDomain from '../../domain/entities/user.entity';
import UserService from './user.service';
import Result from '../../infra/core/factories/result.factory';

class UserController {

	index(request: Request, response: Response) {
		throw new Error('Not implemented...');
	}

	show(request: Request, response: Response) {
		throw new Error('Not implemented...');
	}

	create(request: Request, response: Response) {
		const {
			username,
			name,
			email
		} = request.body;

		const userDomain = new UserDomain(username, name, email);

		const _userService = container.resolve(UserService);

		const user = _userService.create(userDomain);

		response.json(Result.Success(user));
	}

	update(request: Request, response: Response) {
		throw new Error('Not implemented...');
	}

	delete(request: Request, response: Response) {
		throw new Error('Not implemented...');
	}
}

export default new UserController();