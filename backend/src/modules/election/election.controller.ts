import { container } from 'tsyringe';
import ElectionService from './election.service';
import { Request, Response } from 'express';
import Result from '../../infra/core/factories/result.factory';

export default class ElectionController {

	public async show(request: Request, response: Response) {
		try {
			const electionService = container.resolve(ElectionService);

			return response.json(Result.Success());

		} catch(error) {
			return response.json(Result.Fail(error.message));
		}
	}

	public async index(request: Request, response: Response) {
		try {
			const electionService = container.resolve(ElectionService);

			return response.json(Result.Success());

		} catch(error) {
			return response.json(Result.Fail(error.message));
		}
	}

	public async create(request: Request, response: Response) {
		try {
			const electionService = container.resolve(ElectionService);

			return response.json(Result.Success());

		} catch(error) {
			return response.json(Result.Fail(error.message));
		}
	}

	public async update(request: Request, response: Response) {
		try {
			const electionService = container.resolve(ElectionService);

			return response.json(Result.Success());

		} catch(error) {
			return response.json(Result.Fail(error.message));
		}
	}

	public async delete(request: Request, response: Response) {
		try {
			const electionService = container.resolve(ElectionService);

			return response.json(Result.Success());

		} catch(error) {
			return response.json(Result.Fail(error.message));
		}
	}
}