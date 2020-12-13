import { container } from 'tsyringe';
import { Request, Response } from 'express';

import GuestVoterService from './guest-voter.service';
import IGuestVoterEntity from '../../domain/guest-voter/guest-voter.entity';
import Result from '../../infra/core/factories/result.factory';

export default class GuestVoterController {
  public async index(request: Request, response: Response) {
    try {
      const createdBy = request.userId;

      if (createdBy) {
        const guestVoterService = container.resolve(GuestVoterService);

        const list = await guestVoterService.list(createdBy);

        return response.json(list);
      }
    } catch (error) {
      return response.json(Result.Fail(error.message));
    }
  }

  public async create(request: Request, response: Response) {
    const { email, sessionId } = request.body;

    const createdBy = request.userId;

    try {
      const guestVoterService = container.resolve(GuestVoterService);

      const vote = await guestVoterService.save({
        email,
        sessionId,
        createdBy,
      } as IGuestVoterEntity);

      return response.json(Result.Success(vote));
    } catch (error) {
      return response.json(Result.Fail(error.message));
    }
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const guestVoterService = container.resolve(GuestVoterService);

      await guestVoterService.delete(id);

      return response.json(Result.Success());
    } catch (error) {
      return response.json(Result.Fail(error.message));
    }
  }
}