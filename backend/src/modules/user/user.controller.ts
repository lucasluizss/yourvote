import { container } from 'tsyringe';
import UserService from './user.service';
import { Request, Response } from 'express';
import Result from '../../infra/core/factories/result.factory';
import { IUserEntity } from './../../domain/entities/user.entity';
import UserFactory from '../../infra/core/factories/user.factory';

class UserController {

	async index(request: Request, response: Response) {
		try {
			const _userService = container.resolve(UserService);

			const list = await _userService.list();

			return response.json(Result.Success(list.map(UserFactory.create)));

		} catch(error) {
			return response.json(Result.Fail(error));
		}
	}

	async show(request: Request, response: Response) {
		try {
			const { id } = request.params;

			const _userService = container.resolve(UserService);

			const user = await _userService.getById(id);

			return response.json(Result.Success(UserFactory.create(user)));

		} catch(error) {
			return response.json(Result.Fail(error));
		}
	}

	async create(request: Request, response: Response) {
		try {
			const userEntity = request.body as IUserEntity;

			const _userService = container.resolve(UserService);

			const user = await _userService.save(userEntity);

			return response.json(Result.Success(UserFactory.create(user)));

		} catch(error) {
			return response.json(Result.Fail(error.message));
		}
	}

	async update(request: Request, response: Response) {
		try {
			const userEntity = request.body as IUserEntity;

			const _userService = container.resolve(UserService);

			await _userService.update(userEntity);

			return response.json(Result.Success(UserFactory.create(userEntity)));

		} catch(error) {
			return response.json(Result.Fail(error.message));
		}
	}

	async delete(request: Request, response: Response) {
		try {
			const { id } = request.params;

			const _userService = container.resolve(UserService);

			await _userService.delete(id);

			return response.json(Result.Success());

		} catch(error) {
			return response.json(Result.Fail(error.message));
		}
	}
}

export default new UserController();