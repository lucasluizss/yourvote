import { Document } from 'mongoose';

export interface ISessionEntity extends Document {
	title: string;
	description: string;
	createdBy: string;
	startAt: Date;
	expireAt: Date;
	createdAt: Date;
	updatedAt?: Date;
}
