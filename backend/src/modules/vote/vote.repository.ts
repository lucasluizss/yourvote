import IVoteRepository from '../../domain/vote/IVoteRepository';
import IVoteEntity from '../../domain/vote/vote.entity';
import VoteContext from '../../database/models/vote.model';

export default class VoteRepository implements IVoteRepository {

	async save(vote: IVoteEntity): Promise<IVoteEntity> {
		return await VoteContext.create(vote) as IVoteEntity;
	}

	async poll(electionId: string): Promise<any> {
		return await VoteContext.aggregate([
			{ "$match": { "electionId": electionId }},
			{ "$group": { "_id": "candidateId", "sum": { "$sum": 1 } } }
		]);
	}
}
