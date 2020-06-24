import { IElectionEntity } from './../entities/election.entity';

export default interface IElectionService {
	getById(id: string): Promise<IElectionEntity>;
	list(): Promise<IElectionEntity[]>;
	save(election: IElectionEntity): Promise<IElectionEntity>;
	update(election: IElectionEntity): Promise<IElectionEntity>;
	delete(id: string): Promise<boolean>;
}