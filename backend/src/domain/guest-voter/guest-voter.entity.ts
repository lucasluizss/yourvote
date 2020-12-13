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
<<<<<<< HEAD
	expireAt: Date;
=======
>>>>>>> f6f28b7975177ea911dfc790ab245405d130d8d6
	createdAt: Date;
	updatedAt?: Date;
}
