import { Document } from 'mongoose';
import { EStatus } from '../enums/Status.enum';

export default interface IGuestVoterEntity extends Document {
	email: string;
	sessionId: string;
	token: string;
	accessCode: string;
	status: EStatus;
	userId?: string;
	createdBy: string;
	expireAt: Date;
	createdAt: Date;
	updatedAt?: Date;
}
