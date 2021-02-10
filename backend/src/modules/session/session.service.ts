import { inject, injectable } from 'tsyringe';

import SessionRepository from './session.repository';
import ISessionService from '../../domain/session/ISessionService';
import { ISessionEntity } from '../../domain/session/session.entity';
import ISessionRepository from '../../domain/session/ISessionRepository';

@injectable()
export default class SessionService implements ISessionService {
  constructor(
    @inject(SessionRepository.name)
    private readonly sessionRepository: ISessionRepository,
  ) {}

  async getById(id: string): Promise<ISessionEntity> {
    return await this.sessionRepository.getById(id);
  }

  async active(sessionId: string): Promise<boolean> {
    return await this.sessionRepository.active(sessionId);
  }

  async inactive(sessionId: string): Promise<boolean> {
    return await this.sessionRepository.active(sessionId);
  }

  async list(): Promise<ISessionEntity[]> {
    return await this.sessionRepository.list();
  }

  async listCurrent(createdBy?: string): Promise<ISessionEntity[]> {
    return await this.sessionRepository.listCurrent(createdBy);
  }

  async listExpired(createdBy?: string): Promise<ISessionEntity[]> {
    return await this.sessionRepository.listExpired(createdBy);
  }

  async listFuture(createdBy?: string): Promise<ISessionEntity[]> {
    return await this.sessionRepository.listFuture(createdBy);
  }

  async save(session: ISessionEntity): Promise<ISessionEntity> {
    return await this.sessionRepository.save(session);
  }

  async update(session: ISessionEntity): Promise<ISessionEntity> {
    return await this.sessionRepository.update(session);
  }

  async delete(id: string): Promise<boolean> {
    return await this.sessionRepository.delete(id);
  }
}
