import { inject, injectable } from 'tsyringe';
import CandidateRepository from './candidate.repository';
import ICandidateEntity from '../../domain/candidate/candidate.entity';
import ICandidateService from '../../domain/candidate/ICandidateService';
import ICandidateRepository from '../../domain/candidate/ICandidateRepository';

@injectable()
export default class CandidateService implements ICandidateService {

	constructor(
		@inject(CandidateRepository.name) private readonly _candidateRepository: ICandidateRepository,
	) { }

	async getById(id: string): Promise<ICandidateEntity> {
		return await this._candidateRepository.getById(id);
	}

	async list(): Promise<ICandidateEntity[]> {
		return await this._candidateRepository.list();
	}

	async save(election: ICandidateEntity): Promise<ICandidateEntity> {
		return await this._candidateRepository.save(election);
	}

	async update(election: ICandidateEntity): Promise<ICandidateEntity> {
		return await this._candidateRepository.update(election);
	}

	async delete(id: string): Promise<boolean> {
		return await this._candidateRepository.delete(id);
	}
}
