import IGuestVoterRepository from '../../domain/guest-voter/IGuestVoterRepository';
import IGuestVoterEntity from '../../domain/guest-voter/guest-voter.entity';
import GuestVoterContext from '../../database/models/guest-voter.model';

export default class GuestVoterRepository implements IGuestVoterRepository {
  async list(createdBy: string): Promise<IGuestVoterEntity[]> {
    return await GuestVoterContext.find({ createdBy });
  }

  async save(guestVoter: IGuestVoterEntity): Promise<IGuestVoterEntity> {
    return (await GuestVoterContext.create(guestVoter)) as IGuestVoterEntity;
  }

  async exists(email: string): Promise<boolean> {
    return await GuestVoterContext.exists({ email });
  }

  async validate(accessCode: string): Promise<boolean> {
<<<<<<< HEAD
    return await GuestVoterContext.exists({
      accessCode,
      status: 0,
    });
=======
    return (
      (
        await GuestVoterContext.find({
          accessCode,
          status: 0,
        })
      ).length == 0
    );
>>>>>>> f6f28b7975177ea911dfc790ab245405d130d8d6
  }

  async update(guestVoter: IGuestVoterEntity): Promise<IGuestVoterEntity> {
    return (await GuestVoterContext.update(
      { _id: guestVoter._id },
      guestVoter,
    )) as IGuestVoterEntity;
  }

  async delete(guestVoterId: string): Promise<boolean> {
    await GuestVoterContext.findByIdAndRemove({ _id: guestVoterId });
    return true;
  }
}
