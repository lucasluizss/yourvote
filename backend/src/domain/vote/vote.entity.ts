import { Document } from 'mongoose';

export default interface IVoteEntity extends Document {
	userId: string;
	candidateId: string;
	sessionId: string;
	createdAt: Date;
	updatedAt?: Date;
}
