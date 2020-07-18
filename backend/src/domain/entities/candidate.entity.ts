import { EStatus } from './../enums/Status.enum';
import { Document } from 'mongoose';

export default interface ICandidateEntity extends Document {
	userId: string;
	electionId: string;
	status: EStatus;
	createdAt: Date;
	updatedAt: Date;
}
