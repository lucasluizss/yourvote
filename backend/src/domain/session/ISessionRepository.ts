import { ISessionEntity } from './session.entity';
import IRepositoryBase from '../base/IRepositoryBase';

export default interface ISessionRepository extends IRepositoryBase<ISessionEntity> {
  list(createdBy?: string): Promise<ISessionEntity[]>;
  listExpired(createdBy?: string): Promise<ISessionEntity[]>;
  listFuture(createdBy?: string): Promise<ISessionEntity[]>;
}
