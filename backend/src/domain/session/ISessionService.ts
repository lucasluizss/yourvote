import IServiceBase from '../base/IServiceBase';
import { ISessionEntity } from './session.entity';

export default interface ISessionService extends IServiceBase<ISessionEntity> {
  list(): Promise<ISessionEntity[]>;
  listCurrent(createdBy?: string): Promise<ISessionEntity[]>;
  listExpired(createdBy?: string): Promise<ISessionEntity[]>;
  listFuture(createdBy?: string): Promise<ISessionEntity[]>;
  active(sessionId: string): Promise<boolean>;
  inactive(sessionId: string): Promise<boolean>;
}
