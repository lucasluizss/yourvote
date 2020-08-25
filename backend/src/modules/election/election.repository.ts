import ElectionContext from '../../database/models/election.model';
import { IElectionEntity } from '../../domain/election/election.entity';
import IElectionRepository from '../../domain/election/IElectionRepository';

export default class ElectionRepository implements IElectionRepository {

	async getById(id: string): Promise<IElectionEntity> {
		return await ElectionContext.findById({ _id: id }) as IElectionEntity;
	}

	async list(): Promise<IElectionEntity[]> {
		const today = new Date();
		return await ElectionContext.find({ startAt: { $lte: today }, expireAt: { $gte: today } });
	}

	async save(election: IElectionEntity): Promise<IElectionEntity> {
		return await ElectionContext.create(election) as IElectionEntity;
	}

	async update(election: IElectionEntity): Promise<IElectionEntity> {
		return await ElectionContext.findByIdAndUpdate(election._id, election) as IElectionEntity;
	}

	async delete(id: string): Promise<boolean> {
		await ElectionContext.findByIdAndDelete(id);
		return true;
	}
}