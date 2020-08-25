import mongoose, { Schema } from 'mongoose';
import IVoteEntity from '../../domain/vote/vote.entity';

const VoteSchema: Schema = new mongoose.Schema({
	id: String,
	userId: {
		type: String,
		required: true
	},
	candidateId: {
		type: String,
		required: true
	},
	electionId: {
		type: String,
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

export default mongoose.model<IVoteEntity>('Vote', VoteSchema, 'Votes');
