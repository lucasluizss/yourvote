import { Document } from 'mongoose';
import { EStatus } from '../enums/Status.enum';

export default interface ICandidateEntity extends Document {
	userId: string;
	electionId: string;
	status: EStatus;
	createdAt: Date;
	updatedAt?: Date;
}
