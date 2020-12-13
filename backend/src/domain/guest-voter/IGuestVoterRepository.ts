import IGuestVoterEntity from './guest-voter.entity';

export default interface IGuestVoterRepository {
	getByCode(accessCode: string): Promise<IGuestVoterEntity | null>;
	list(createdBy: string): Promise<IGuestVoterEntity[]>
	save(guestVoter: IGuestVoterEntity): Promise<IGuestVoterEntity>;
	exists(email: string): Promise<boolean>;
	validate(accessCode: string): Promise<boolean>;
	invalidateCode(accessCode: string): Promise<void>;
	update(guestVoter: IGuestVoterEntity): Promise<IGuestVoterEntity>;
	delete(guestVoterId: string): Promise<boolean>;
}
