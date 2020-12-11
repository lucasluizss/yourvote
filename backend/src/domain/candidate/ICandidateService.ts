import IServiceBase from '../base/IServiceBase';
import ICandidateEntity from './candidate.entity';

export default interface ICandidateService extends IServiceBase<ICandidateEntity> {
  listBySession(sessionId: string): Promise<ICandidateEntity[]>;
  validate(sessionId: string, candidateId: string): Promise<boolean>;
  generateValidCode(sessionId: string): Promise<string>;
  validateCodeUnavailable(code: string, sessionId: string): Promise<boolean>;
}
