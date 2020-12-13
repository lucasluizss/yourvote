import ICandidateRepository from '../../domain/candidate/ICandidateRepository';
import ICandidateEntity from '../../domain/candidate/candidate.entity';
import CandidateContext from '../../database/models/candidate.model';

export default class CandidateRepository implements ICandidateRepository {
  async getById(id: string): Promise<ICandidateEntity> {
    return (await CandidateContext.findById({ _id: id })) as ICandidateEntity;
  }

  async list(): Promise<ICandidateEntity[]> {
    return await CandidateContext.find();
  }

  async listBySession(sessionId: string): Promise<ICandidateEntity[]> {
    return await CandidateContext.find({ sessionId });
  }

  async exists(sessionId: string, userId: string): Promise<boolean> {
		return await CandidateContext.exists({ userId, sessionId });
  }

  async validateCodeUnavailable(
    code: string,
    sessionId: string,
  ): Promise<boolean> {
    return await CandidateContext.exists({ code, sessionId });
  }

  async save(candidate: ICandidateEntity): Promise<ICandidateEntity> {
    return (await CandidateContext.create(candidate)) as ICandidateEntity;
  }

  async update(candidate: ICandidateEntity): Promise<ICandidateEntity> {
    return (await CandidateContext.findByIdAndUpdate(
      candidate._id,
      candidate,
    )) as ICandidateEntity;
  }

  async delete(id: string): Promise<boolean> {
    await CandidateContext.findByIdAndDelete(id);
    return true;
  }
}
