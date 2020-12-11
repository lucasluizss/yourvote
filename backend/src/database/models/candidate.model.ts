import mongoose, { Schema } from 'mongoose';

import ICandidateEntity from '../../domain/candidate/candidate.entity';

const CandidateSchema: Schema = new mongoose.Schema({
	id: String,
	userId: {
		type: String,
		required: true
	},
	sessionId: {
		type: String,
		required: true
	},
	code: {
		type: String,
		required: false
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

export default mongoose.model<ICandidateEntity>('Candidate', CandidateSchema, 'Candidates');
