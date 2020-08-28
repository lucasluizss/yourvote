import IVoteRepository from '../../domain/vote/IVoteRepository';
import IVoteEntity from '../../domain/vote/vote.entity';
import VoteContext from '../../database/models/vote.model';

export default class VoteRepository implements IVoteRepository {

	async save(vote: IVoteEntity): Promise<IVoteEntity> {
		return await VoteContext.create(vote) as IVoteEntity;
	}

	async update(vote: IVoteEntity): Promise<IVoteEntity> {
		return await VoteContext.update({ _id: vote._id }, vote) as IVoteEntity;
	}

	async delete(voteId: string): Promise<boolean> {
		await VoteContext.findByIdAndRemove({ _id: voteId });
		return true;
	}

	async poll(electionId: string): Promise<any> {
		return await VoteContext.aggregate([
			{ "$match": { "electionId": electionId }},
			{ "$group": { "_id": "candidateId", "sum": { "$sum": 1 } } }
		]);
	}
}
