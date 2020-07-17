import { EStatus } from './../../domain/enums/Status.enum';
import mongoose, { Schema } from 'mongoose';
import ICandidateEntity from '../../domain/entities/candidate.entity';

const CandidateSchema: Schema = new mongoose.Schema({
	id: String,
	userId: {
		type: String,
		required: true
	},
	electionId: {
		type: String,
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

export default mongoose.model<ICandidateEntity>('Candidate', CandidateSchema, 'Candidates');
