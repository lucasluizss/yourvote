import SessionContext from '../../database/models/session.model';
import { ISessionEntity } from '../../domain/session/session.entity';
import ISessionRepository from '../../domain/session/ISessionRepository';

export default class SessionRepository implements ISessionRepository {
  async getById(id: string): Promise<ISessionEntity> {
    return (await SessionContext.findById({ _id: id })) as ISessionEntity;
  }

  async list(): Promise<ISessionEntity[]> {
    return await SessionContext.find();
  }

  async listCurrent(createdBy?: string): Promise<ISessionEntity[]> {
    const today = new Date();
    return await SessionContext.find({
      $and: [
        { startAt: { $lte: today } },
        { expireAt: { $gte: today } },
        { createdBy },
        { status: 1 },
      ],
    });
  }

  async listExpired(createdBy?: string): Promise<ISessionEntity[]> {
    const today = new Date();
    return await SessionContext.find({
      $and: [{ expireAt: { $lt: today } }, { createdBy }, { status: 1 }],
    });
  }

  async listFuture(createdBy?: string): Promise<ISessionEntity[]> {
    const today = new Date();
    return await SessionContext.find({
      $and: [{ startAt: { $gt: today } }, { createdBy }, { status: 1 }],
    });
  }

  async save(session: ISessionEntity): Promise<ISessionEntity> {
    return (await SessionContext.create(session)) as ISessionEntity;
  }

  async active(sessionId: string): Promise<boolean> {
    await SessionContext.findByIdAndUpdate({ _id: sessionId }, { status: 1 });
    return true;
  }

  async inactive(sessionId: string): Promise<boolean> {
    await SessionContext.findByIdAndUpdate({ _id: sessionId }, { status: 0 });
    return true;
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
