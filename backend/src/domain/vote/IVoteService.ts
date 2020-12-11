import VotePollDto from './vote-poll.dto';
import IVoteEntity from './vote.entity';

export default interface IVoteService {
  save(vote: IVoteEntity): Promise<IVoteEntity>;
  validate(sessionId?: string, userId?: string): Promise<boolean>;
  update(vote: IVoteEntity): Promise<IVoteEntity>;
  delete(voteId: string): Promise<boolean>;
  poll(sessionId: string): Promise<VotePollDto[]>;
}
