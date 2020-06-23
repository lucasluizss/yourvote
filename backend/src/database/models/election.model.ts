import mongoose, { Schema } from 'mongoose';
import { ElectionEntity } from './../../domain/entities/election.entity';

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

export default mongoose.model<ElectionEntity>('Election', ElectionSchema, 'Elections');
