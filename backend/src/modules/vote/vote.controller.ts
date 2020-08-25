import { container } from 'tsyringe';
import { Request, Response } from 'express';

import VoteService from './vote.service';
import IVoteEntity from '../../domain/vote/vote.entity';
import Result from '../../infra/core/factories/result.factory';

export default class VoteController {
	public async index(request: Request, response: Response) {
		const { electionId } = request.params;

		try {
			const voteService = container.resolve(VoteService);

			const poll = await voteService.poll(electionId);

			return response.json(poll);
		} catch (error) {
			return response.json(Result.Fail(error.message));
		}
	}

	public async show(request: Request, response: Response) {
		return response.json(Result.Fail());
	}

	public async create(request: Request, response: Response) {
		const {
			candidateId,
			electionId
		} = request.body;

		const userId = request.userId;

		try {
			const voteService = container.resolve(VoteService);

			const vote = await voteService.save({ userId, candidateId, electionId } as IVoteEntity);

			return response.json(Result.Success(vote));
		} catch (error) {
			return response.json(Result.Fail(error.message));
		}
	}

	public async update(request: Request, response: Response) {
		return response.json(Result.Fail());
	}

	public async delete(request: Request, response: Response) {
		return response.json(Result.Fail());
	}
}
