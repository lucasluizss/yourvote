import { Document } from 'mongoose';

export interface IElectionEntity extends Document {
	title: string;
	description: string;
	startAt: Date;
	expireAt: Date;
	createdAt: Date;
	updatedAt: Date;
}
