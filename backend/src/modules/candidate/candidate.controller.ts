import { container } from 'tsyringe';
import { Request, Response } from 'express';

import Result from '../../infra/core/factories/result.factory';
import CandidateService from './candidate.service';
import ICandidateEntity from '../../domain/candidate/candidate.entity';

export default class CandidateController {
  public async show(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const candidateService = container.resolve(CandidateService);

      const candidate = await candidateService.getById(id);

      return response.json(Result.Success(candidate));
    } catch (error) {
      return response.json(Result.Fail(error.message));
    }
  }

  public async index(request: Request, response: Response) {
    try {
      const candidateService = container.resolve(CandidateService);

      const candidates = await candidateService.list();

      return response.json(Result.Success(candidates));
    } catch (error) {
      return response.json(Result.Fail(error.message));
    }
  }

  public async indexBySession(request: Request, response: Response) {
		const { sessionId } = request.params;
		
    try {
      const candidateService = container.resolve(CandidateService);

      const candidates = await candidateService.listBySession(sessionId);

      return response.json(Result.Success(candidates));
    } catch (error) {
      return response.json(Result.Fail(error.message));
    }
  }

  public async create(request: Request, response: Response) {
    let { userId, sessionId, code, status } = request.body;

    try {
      const candidateService = container.resolve(CandidateService);

      if (code) {
        const codeIsUnavailable = await candidateService.validateCodeUnavailable(
          code,
          sessionId,
        );

        if (codeIsUnavailable) {
          return response.json(
            Result.Fail(`Código ${code} para esta sessão indisponível`),
          );
        }
      } else {
        code = candidateService.generateValidCode(sessionId);
      }

      const candidate = await candidateService.save({
        userId,
        sessionId,
        code,
        status,
      } as ICandidateEntity);

      return response.json(Result.Success(candidate));
    } catch (error) {
      return response.json(Result.Fail(error.message));
    }
  }

  public async update(request: Request, response: Response) {
    const { id } = request.params;

    const { userId, sessionId, code, status } = request.body;

    try {
      const candidateService = container.resolve(CandidateService);

      const candidate = await candidateService.update({
        id,
        userId,
        sessionId,
        code,
        status,
      } as ICandidateEntity);

      return response.json(Result.Success(candidate));
    } catch (error) {
      return response.json(Result.Fail(error.message));
    }
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const candidateService = container.resolve(CandidateService);

      await candidateService.delete(id);

      return response.json(Result.Success());
    } catch (error) {
      return response.json(Result.Fail(error.message));
    }
  }
}
