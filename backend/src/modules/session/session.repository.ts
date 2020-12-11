import SessionContext from '../../database/models/session.model';
import { ISessionEntity } from '../../domain/session/session.entity';
import ISessionRepository from '../../domain/session/ISessionRepository';

export default class SessionRepository implements ISessionRepository {
  async getById(id: string): Promise<ISessionEntity> {
    return (await SessionContext.findById({ _id: id })) as ISessionEntity;
  }

  async list(createdBy?: string): Promise<ISessionEntity[]> {
    const today = new Date();
    return await SessionContext.find({
      $and: [
        { startAt: { $lte: today } },
        { expireAt: { $gte: today } },
        { createdBy },
      ],
    });
  }

  async listExpired(createdBy?: string): Promise<ISessionEntity[]> {
    const today = new Date();
    return await SessionContext.find({
      $and: [{ expireAt: { $lt: today } }, { createdBy }],
    });
  }

  async listFuture(createdBy?: string): Promise<ISessionEntity[]> {
    const today = new Date();
    return await SessionContext.find({
      $and: [{ startAt: { $gt: today } }, { createdBy }],
    });
  }

  async save(session: ISessionEntity): Promise<ISessionEntity> {
    return (await SessionContext.create(session)) as ISessionEntity;
  }

  async update(session: ISessionEntity): Promise<ISessionEntity> {
    return (await SessionContext.findByIdAndUpdate(
      session._id,
      session,
    )) as ISessionEntity;
  }

  async delete(id: string): Promise<boolean> {
    await SessionContext.findByIdAndDelete(id);
    return true;
  }
}
