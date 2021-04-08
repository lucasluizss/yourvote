import IVoteEntity from '../../domain/vote/vote.entity';
import VoteContext from '../../database/models/vote.model';
import IVoteRepository from '../../domain/vote/IVoteRepository';

export default class VoteRepository implements IVoteRepository {
  async save(vote: IVoteEntity): Promise<IVoteEntity> {
    return (await VoteContext.create(vote)) as IVoteEntity;
  }

  async validate(sessionId: string, userId?: string): Promise<boolean> {
    return await VoteContext.exists({
      sessionId,
      userId,
    });
  }

  async update(vote: IVoteEntity): Promise<IVoteEntity> {
    return (await VoteContext.updateOne({ _id: vote._id }, vote)) as IVoteEntity;
  }

  async delete(voteId: string): Promise<boolean> {
    await VoteContext.findByIdAndRemove({ _id: voteId });
    return true;
  }

  async poll(sessionId: string): Promise<any> {
    return await VoteContext.aggregate([
      { $match: { sessionId: sessionId } },
      { $group: { _id: '$candidateId', count: { $sum: 1 } } },
    ]);
  }
}
