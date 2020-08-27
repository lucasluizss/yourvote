import VotePollDto from './vote-poll.dto';
import IVoteEntity from './vote.entity';

export default interface IVoteService {
	save(vote: IVoteEntity): Promise<IVoteEntity>;
	update(vote: IVoteEntity): Promise<IVoteEntity>;
	poll(electionId: string): Promise<VotePollDto[]>;
}
