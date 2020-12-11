import mongoose, { Schema } from 'mongoose';

import { ISessionEntity } from '../../domain/session/session.entity';

const SessionSchema: Schema = new mongoose.Schema({
	id: String,
	createdBy: {
		type: String,
		require: true
	},
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
		type: Number,
		required: true,
    min: 0,
    max: 2,
    default: 0
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

export default mongoose.model<ISessionEntity>('Session', SessionSchema, 'Sessions');
