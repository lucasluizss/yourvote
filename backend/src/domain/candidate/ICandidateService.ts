import IServiceBase from '../base/IServiceBase';
import ICandidateEntity from './candidate.entity';

export default interface ICandidateService extends IServiceBase<ICandidateEntity> {
  listBySession(sessionId: string): Promise<ICandidateEntity[]>;
  exists(sessionId: string, userId: string): Promise<boolean>;
  generateValidCode(sessionId: string): Promise<string>;
  validateCodeUnavailable(code: string, sessionId: string): Promise<boolean>;
}
