import { inject, injectable } from 'tsyringe';
import ElectionRepository from './election.repository';
import IElectionService from '../../domain/services/IElectionService';
import { IElectionEntity } from '../../domain/entities/election.entity';
import IElectionRepository from '../../domain/repositories/IElectionRepository';

@injectable()
export default class ElectionService implements IElectionService {

	constructor(
		@inject(ElectionRepository.name) private readonly _electionRepository: IElectionRepository,
	) { }

	async getById(id: string): Promise<IElectionEntity> {
		return await this._electionRepository.getById(id);
	}

	async list(): Promise<IElectionEntity[]> {
		return await this._electionRepository.list();
	}

	async save(election: IElectionEntity): Promise<IElectionEntity> {
		return await this._electionRepository.save(election);
	}

	async update(election: IElectionEntity): Promise<IElectionEntity> {
		return await this._electionRepository.update(election);
	}

	async delete(id: string): Promise<boolean> {
		await this._electionRepository.delete(id);
		return true
	}

}
