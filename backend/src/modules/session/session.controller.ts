import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { ISessionEntity } from '../../domain/session/session.entity';
import Result from '../../infra/core/factories/result.factory';
import SessionService from './session.service';

export default class SessionController {
  public async show(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const sessionService = container.resolve(SessionService);

      const session = await sessionService.getById(id);

      return response.json(Result.Success(session));
    } catch (error) {
      return response.status(400).json(Result.Fail(error.message));
    }
  }

  public async index(request: Request, response: Response) {
    try {
      const createdBy = request.userId;
      const sessionService = container.resolve(SessionService);

      const sessions = await sessionService.list(createdBy);

      return response.json(Result.Success(sessions));
    } catch (error) {
      return response.status(400).json(Result.Fail(error.message));
    }
  }

  public async indexExpired(request: Request, response: Response) {
    try {
      const createdBy = request.userId;
      const sessionService = container.resolve(SessionService);

      const sessions = await sessionService.listExpired(createdBy);

      return response.json(Result.Success(sessions));
    } catch (error) {
      return response.status(400).json(Result.Fail(error.message));
    }
  }

  public async indexFuture(request: Request, response: Response) {
    try {
      const createdBy = request.userId;
      const sessionService = container.resolve(SessionService);

      const sessions = await sessionService.listFuture(createdBy);

      return response.json(Result.Success(sessions));
    } catch (error) {
      return response.status(400).json(Result.Fail(error.message));
    }
  }

  public async create(request: Request, response: Response) {
    const { title, description, startAt, expireAt } = request.body;

    try {
      const createdBy = request.userId;
      const sessionService = container.resolve(SessionService);

      const session = await sessionService.save({
        title,
        description,
        createdBy,
        startAt,
        expireAt,
      } as ISessionEntity);

      return response.json(Result.Success(session));
    } catch (error) {
      return response.status(400).json(Result.Fail(error.message));
    }
  }

  public async update(request: Request, response: Response) {
    const { id } = request.params;
    const { title, description, startAt, expireAt } = request.body;

    try {
      const sessionService = container.resolve(SessionService);

      const session = await sessionService.update({
        _id: id,
        title,
        description,
        startAt,
        expireAt,
      } as ISessionEntity);

      return response.json(Result.Success(session));
    } catch (error) {
      return response.status(400).json(Result.Fail(error.message));
    }
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const sessionService = container.resolve(SessionService);

      await sessionService.delete(id);

      return response.json(Result.Success());
    } catch (error) {
      return response.status(400).json(Result.Fail(error.message));
    }
  }
}
