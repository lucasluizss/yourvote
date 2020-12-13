import { inject, injectable } from 'tsyringe';

import CandidateRepository from './candidate.repository';
import ICandidateEntity from '../../domain/candidate/candidate.entity';
import ICandidateService from '../../domain/candidate/ICandidateService';
import ICandidateRepository from '../../domain/candidate/ICandidateRepository';

@injectable()
export default class CandidateService implements ICandidateService {
  constructor(
    @inject(CandidateRepository.name)
    private readonly candidateRepository: ICandidateRepository,
  ) {}

  async getById(id: string): Promise<ICandidateEntity> {
    return await this.candidateRepository.getById(id);
  }

  async list(): Promise<ICandidateEntity[]> {
    return await this.candidateRepository.list();
  }

  async listBySession(sessionId: string): Promise<ICandidateEntity[]> {
    return await this.candidateRepository.listBySession(sessionId);
  }

  async exists(sessionId: string, userId: string): Promise<boolean> {
    return await this.candidateRepository.exists(sessionId, userId);
  }

  async validateCodeUnavailable(
    code: string,
    sessionId: string,
  ): Promise<boolean> {
    return await this.candidateRepository.validateCodeUnavailable(
      code,
      sessionId,
    );
  }

  async generateValidCode(sessionId: string): Promise<string> {
    let code = `${Math.floor(Math.random() * 100000)}`.padStart(5, '0');

    while (
      await this.candidateRepository.validateCodeUnavailable(code, sessionId)
    ) {
      code = `${Math.floor(Math.random() * 100000)}`.padStart(5, '0');
    }

    return code;
  }

  async save(candidate: ICandidateEntity): Promise<ICandidateEntity> {
    const candidateExists = this.exists(
      candidate.sessionId,
      candidate.userId,
    );

    if (candidateExists) {
      throw new Error('Candidato já submetido!');
    }

    if (candidate.code) {
      const codeIsUnavailable = await this.validateCodeUnavailable(
        candidate.code,
        candidate.sessionId,
      );

      if (codeIsUnavailable) {
        throw new Error(
          `Código ${candidate.code} para esta sessão indisponível`,
        );
      }
    } else {
      candidate.code = await this.generateValidCode(candidate.sessionId);
    }

    return await this.candidateRepository.save(candidate);
  }

  async update(candidate: ICandidateEntity): Promise<ICandidateEntity> {
    if (candidate.code) {
      const codeIsUnavailable = await this.validateCodeUnavailable(
        candidate.code,
        candidate.sessionId,
      );

      if (codeIsUnavailable) {
        throw new Error(
          `Código ${candidate.code} para esta sessão indisponível`,
        );
      }
    } else {
      candidate.code = await this.generateValidCode(candidate.sessionId);
    }

    return await this.candidateRepository.update(candidate);
  }

  async delete(id: string): Promise<boolean> {
    return await this.candidateRepository.delete(id);
  }
}
