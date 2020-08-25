import { Document } from 'mongoose';

export default interface IVoteEntity extends Document {
	userId: string;
	candidateId: string;
	electionId: string;
	createdAt: Date;
	updatedAt?: Date;
}
