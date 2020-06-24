import mongoose, { Schema } from 'mongoose';
import { IElectionEntity } from './../../domain/entities/election.entity';

const ElectionSchema: Schema = new mongoose.Schema({
	id: String,
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: false
	},
	startAt: {
		type: Date,
		required: true
	},
	expireAt: {
		type: Date,
		required: true
	},
	createdAt: {
		type: Date,
		required: true,
		default: new Date()
	},
	updatedAt: {
		type: Date,
		required: false,
		default: null
	}
});

export default mongoose.model<IElectionEntity>('Election', ElectionSchema, 'Elections');
