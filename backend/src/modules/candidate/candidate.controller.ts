import { Request, Response } from 'express';
import { container } from 'tsyringe';
import Result from '../../infra/core/factories/result.factory';
import CandidateService from './candidate.service';
import ICandidateEntity from '../../domain/candidate/candidate.entity';

export default class CandidateController {

		public async show(request: Request, response: Response) {
			const { id } = request.params;

			try {
				const candidateService = container.resolve(CandidateService);

				const candidate = await candidateService.getById(id);

				return response.json(Result.Success(candidate));

			} catch(error) {
				return response.json(Result.Fail(error.message));
			}
		}

		public async index(request: Request, response: Response) {
			try {
				const candidateService = container.resolve(CandidateService);

				const candidates = await candidateService.list();

				return response.json(Result.Success(candidates));

			} catch(error) {
				return response.json(Result.Fail(error.message));
			}
		}

		public async create(request: Request, response: Response) {
			const {
				userId,
				electionId,
				status
			} = request.body;

			try {
				const candidateService = container.resolve(CandidateService);

				const candidate = await candidateService.save({ userId, electionId, status } as ICandidateEntity);

				return response.json(Result.Success(candidate));

			} catch(error) {
				return response.json(Result.Fail(error.message));
			}
		}

		public async update(request: Request, response: Response) {
			const { id } = request.params;

			const {
				userId,
				electionId,
				status
			} = request.body;

			try {
				const candidateService = container.resolve(CandidateService);

				const candidate = await candidateService.update({
					id,
					userId,
					electionId,
					status
				} as ICandidateEntity);

				return response.json(Result.Success(candidate));

			} catch(error) {
				return response.json(Result.Fail(error.message));
			}
		}

		public async delete(request: Request, response: Response) {
			const { id } = request.params;

			try {
				const candidateService = container.resolve(CandidateService);

				await candidateService.delete(id);

				return response.json(Result.Success());

			} catch(error) {
				return response.json(Result.Fail(error.message));
			}
		}
}