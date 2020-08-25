import { IElectionEntity } from '../../domain/election/election.entity';
import { container } from 'tsyringe';
import ElectionService from './election.service';
import { Request, Response } from 'express';
import Result from '../../infra/core/factories/result.factory';

export default class ElectionController {

	public async show(request: Request, response: Response) {
		const { id } = request.params;

		try {
			const electionService = container.resolve(ElectionService);

			const election = await electionService.getById(id);

			return response.json(Result.Success(election));

		} catch(error) {
			return response.json(Result.Fail(error.message));
		}
	}

	public async index(request: Request, response: Response) {
		try {
			const electionService = container.resolve(ElectionService);

			const elections = await electionService.list();

			return response.json(Result.Success(elections));

		} catch(error) {
			return response.json(Result.Fail(error.message));
		}
	}

	public async create(request: Request, response: Response) {
		const { title, description, startAt, expireAt } = request.body;

		try {
			const electionService = container.resolve(ElectionService);

			const election = await electionService.save({ title, description, startAt, expireAt } as IElectionEntity);

			return response.json(Result.Success(election));

		} catch(error) {
			return response.json(Result.Fail(error.message));
		}
	}

	public async update(request: Request, response: Response) {
		const { id } = request.params;
		const { title, description, startAt, expireAt } = request.body;

		try {
			const electionService = container.resolve(ElectionService);

			const election = await electionService.update({ _id: id, title, description, startAt, expireAt } as IElectionEntity);

			return response.json(Result.Success(election));

		} catch(error) {
			return response.json(Result.Fail(error.message));
		}
	}

	public async delete(request: Request, response: Response) {
		const { id } = request.params;

		try {
			const electionService = container.resolve(ElectionService);

			await electionService.delete(id);

			return response.json(Result.Success());

		} catch(error) {
			return response.json(Result.Fail(error.message));
		}
	}
}