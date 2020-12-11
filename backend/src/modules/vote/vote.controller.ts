import { container } from 'tsyringe';
import { Request, Response } from 'express';

import VoteService from './vote.service';
import IVoteEntity from '../../domain/vote/vote.entity';
import Result from '../../infra/core/factories/result.factory';
import CandidateService from '../candidate/candidate.service';

export default class VoteController {
  public async index(request: Request, response: Response) {
    const { sessionId } = request.params;

    try {
      const voteService = container.resolve(VoteService);

      const poll = await voteService.poll(sessionId);

      return response.json(poll);
    } catch (error) {
      return response.json(Result.Fail(error.message));
    }
  }

  public async create(request: Request, response: Response) {
    const { candidateId, sessionId } = request.body;

    const userId = request.userId;

    try {
      const voteService = container.resolve(VoteService);
      const candidateService = container.resolve(CandidateService);

      const userHasNotVoted = await voteService.validate(sessionId, userId);

      const candidateExistsOnSession = await candidateService.validate(
        sessionId,
        candidateId,
      );

      if (userHasNotVoted && candidateExistsOnSession) {
        const vote = await voteService.save({
          userId,
          candidateId,
          sessionId,
        } as IVoteEntity);

        return response.json(Result.Success(vote));
      } else {
        return response.json(
          Result.Fail('Voto já registrado!'),
        );
      }
    } catch (error) {
      return response.json(Result.Fail(error.message));
    }
  }

  public async update(request: Request, response: Response) {
    try {
      const voteEntity = request.body as IVoteEntity;

      const voteService = container.resolve(VoteService);

      await voteService.update(voteEntity);

      return response.json(Result.Success(voteEntity));
    } catch (error) {
      return response.json(Result.Fail(error.message));
    }
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const voteService = container.resolve(VoteService);

      await voteService.delete(id);

      return response.json(Result.Success());
    } catch (error) {
      return response.json(Result.Fail(error.message));
    }
  }
}
