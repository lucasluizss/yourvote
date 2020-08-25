import mongoose, { Schema } from 'mongoose';
import { EStatus } from './../../domain/enums/Status.enum';
import { IElectionEntity } from '../../domain/election/election.entity';

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
	status: {
		type: EStatus,
		required: true,
		enum: EStatus,
		default: EStatus.Inactive
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
