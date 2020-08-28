import IVoteEntity from './vote.entity';

export default interface IVoteRepository {
	save(vote: IVoteEntity): Promise<IVoteEntity>;
	update(vote: IVoteEntity): Promise<IVoteEntity>;
	delete(voteId: string): Promise<boolean>;
	poll(electionId: string): Promise<any>;
}
