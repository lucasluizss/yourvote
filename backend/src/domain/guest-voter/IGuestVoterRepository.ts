import IGuestVoterEntity from './guest-voter.entity';

export default interface IGuestVoterRepository {
	list(createdBy: string): Promise<IGuestVoterEntity[]>
	save(guestVoter: IGuestVoterEntity): Promise<IGuestVoterEntity>;
	exists(email: string): Promise<boolean>;
	validate(accessCode: string): Promise<boolean>;
	update(guestVoter: IGuestVoterEntity): Promise<IGuestVoterEntity>;
	delete(guestVoterId: string): Promise<boolean>;
}
