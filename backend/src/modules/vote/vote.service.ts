import { inject, injectable } from 'tsyringe';

import IVoteService from '../../domain/vote/IVoteService';
import VotePollDto from '../../domain/vote/vote-poll.dto';
import IVoteEntity from '../../domain/vote/vote.entity';
import VoteRepository from './vote.repository';
import IVoteRepository from '../../domain/vote/IVoteRepository';

@injectable()
export default class VoteService implements IVoteService {
  constructor(
    @inject(VoteRepository.name)
    private readonly voteRepository: IVoteRepository,
  ) {}

  async save(vote: IVoteEntity): Promise<IVoteEntity> {
    const userHasNotVoted = await this.validate(vote.sessionId, vote.userId);

    if (!userHasNotVoted) {
      throw new Error('Voto já registrado!');
    }

    return await this.voteRepository.save(vote);
  }

  async validate(sessionId: string, userId?: string): Promise<boolean> {
    return await this.voteRepository.validate(sessionId, userId);
  }

  async update(vote: IVoteEntity): Promise<IVoteEntity> {
    return await this.voteRepository.update(vote);
  }

  async delete(voteId: string): Promise<boolean> {
    return await this.voteRepository.delete(voteId);
  }

  async poll(sessionId: string): Promise<VotePollDto[]> {
    const votes = await this.voteRepository.poll(sessionId);
    return votes.map(this.createPoll);
  }

  private createPoll({
    _id,
    count,
  }: {
    _id: string;
    count: number;
  }): VotePollDto {
    return {
      candidateId: _id,
      count,
    } as VotePollDto;
  }
}
