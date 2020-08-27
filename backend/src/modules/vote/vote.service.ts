import { inject } from 'tsyringe';

import IVoteService from '../../domain/vote/IVoteService';
import VotePollDto from '../../domain/vote/vote-poll.dto';
import IVoteEntity from '../../domain/vote/vote.entity';
import VoteRepository from './vote.repository';
import IVoteRepository from '../../domain/vote/IVoteRepository';

export default class VoteService implements IVoteService {

	constructor(
		@inject(VoteRepository.name)
		private readonly _voteRepository: IVoteRepository
	) { }

	async save(vote: IVoteEntity): Promise<IVoteEntity> {
		return await this._voteRepository.save(vote);
	}

	async update(vote: IVoteEntity): Promise<IVoteEntity> {
		return await this._voteRepository.update(vote);
	}

	async poll(electionId: string): Promise<VotePollDto[]> {
		const votes = await this._voteRepository.poll(electionId);

		return votes.map(this.createPoll);
	}

	private createPoll(vote: IVoteEntity): VotePollDto {
		return {
			candidateId: vote.candidateId,
			electionId: vote.electionId,
			poll: 1
		} as VotePollDto;
	}
}