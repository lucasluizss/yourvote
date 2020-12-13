import IRepositoryBase from '../base/IRepositoryBase';
import ICandidateEntity from './candidate.entity';

export default interface ICandidateRepository extends IRepositoryBase<ICandidateEntity> {
  listBySession(sessionId: string): Promise<ICandidateEntity[]>;
  exists(sessionId: string, userId: string): Promise<boolean>;
  validateCodeUnavailable(code: string, sessionId: string): Promise<boolean>;
}
