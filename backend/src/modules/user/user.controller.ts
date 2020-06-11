import UserEntity, { IUserEntity } from './../../domain/entities/user.entity';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UserService from './user.service';
import Result from '../../infra/core/factories/result.factory';

class UserController {

	async index(request: Request, response: Response) {
		throw new Error('Not implemented...');
	}

	async show(request: Request, response: Response) {
		try {
			const { id } = request.params;

			const _userService = container.resolve(UserService);

			const user = await _userService.getById(id);

			return response.json(Result.Success(user));
		} catch(error) {
			return response.json(Result.Fail(error));
		}
	}

	async create(request: Request, response: Response) {
		try {
			const userEntity = request.body as IUserEntity;
			const _userService = container.resolve(UserService);

			const user = await _userService.save(userEntity);

			return response.json(Result.Success(user));
		} catch(error) {
			return response.json(Result.Fail(error.message));
		}
	}

	async update(request: Request, response: Response) {
		throw new Error('Not implemented...');
	}

	async delete(request: Request, response: Response) {
		throw new Error('Not implemented...');
	}
}

export default new UserController();