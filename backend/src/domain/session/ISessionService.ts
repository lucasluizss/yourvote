import IServiceBase from '../base/IServiceBase';
import { ISessionEntity } from './session.entity';

export default interface ISessionService extends IServiceBase<ISessionEntity> {
  list(createdBy?: string): Promise<ISessionEntity[]>;
  listExpired(createdBy?: string): Promise<ISessionEntity[]>;
  listFuture(createdBy?: string): Promise<ISessionEntity[]>;
}
