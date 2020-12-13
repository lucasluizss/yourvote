import IGuestVoterEntity from './guest-voter.entity';

export default interface IGuestVoterService {
  list(createdBy: string): Promise<IGuestVoterEntity[]>;
  save(guestVoter: IGuestVoterEntity): Promise<IGuestVoterEntity>;
  exists(email: string): Promise<boolean>;
  validate(accessCode?: string): Promise<boolean>;
  delete(guestVoterId: string): Promise<boolean>;
}
