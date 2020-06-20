
import mongoose, { Schema } from 'mongoose';
import IAuthenticationHistory from '../../domain/entities/authentication-history.entity';

const AuthenticationHistorySchema: Schema = new mongoose.Schema({
	userId: {
		type: String,
		required: true
	},
	loginDate: {
		type: Date,
		required: true
	},
	logoutDate: {
		type: Date,
		default: null
	},
	ip: {
		type: String,
		required: true
	},
	device: {
		type: String,
		default: null
	},
	token: {
		type: String,
		required: true,
		unique:true
	}
});

export default mongoose.model<IAuthenticationHistory>('AuthenticationHistory', AuthenticationHistorySchema, 'AuthenticationHistory');
