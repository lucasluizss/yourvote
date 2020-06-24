import { Document } from 'mongoose';

export interface ElectionEntity extends Document{
	title: string;
	description: string;
	startAt: Date;
	expireAt: Date;
	createdAt: Date;
	updatedAt: Date;
}
