import IElectionService from '../../domain/services/IElectionService';
import { IElectionEntity } from '../../domain/entities/election.entity';

export default class ElectionService implements IElectionService {

	getById(): Promise<IElectionEntity> {
		throw new Error('Method not implemented.');
	}

	list(): Promise<IElectionEntity[]> {
		throw new Error('Method not implemented.');
	}

	save(election: IElectionEntity): Promise<IElectionEntity> {
		throw new Error('Method not implemented.');
	}

	update(election: IElectionEntity): Promise<IElectionEntity> {
		throw new Error('Method not implemented.');
	}

	delete(id: string): Promise<boolean> {
		throw new Error('Method not implemented.');
	}

}