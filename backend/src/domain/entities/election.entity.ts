import { Document } from 'mongoose';

export interface ElectionEntity extends Document{
	title: string;
	description: string;
	createdAt: Date;
	updatedAt: Date;
}
