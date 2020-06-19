import { IAuthenticationHistory } from './../../domain/entities/authentication-history.entity';
import mongoose, { Schema } from 'mongoose';

const AuthenticationHistorySchema: Schema = new mongoose.Schema({
	id: {
		type: Schema.Types.ObjectId,
		required: true,
		unique: true,
		index: true
	},
	userId: {
		type: Schema.Types.ObjectId,
		required: true
	},
	loginDate: {
		type: Date,
		required: true
	},
	logoutDate: {
		type: Date,
		required: true
	},
	ip: {
		type: String,
		required: true
	},
	device: {
		type: String,
		required: true
	},
	token: {
		type: String,
		required: true
	}
});

export default mongoose.model<IAuthenticationHistory>('AuthenticationHistory', AuthenticationHistorySchema, 'AuthenticationHistory');
