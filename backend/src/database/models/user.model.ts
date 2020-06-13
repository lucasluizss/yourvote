import mongoose, { Schema } from 'mongoose';
import { ERole } from './../../domain/enums/Roles.enum';
import { EStatus } from './../../domain/enums/Status.enum';
import { IUserEntity } from './../../domain/entities/user.entity';

const UserSchema: Schema = new mongoose.Schema({
	id: String,
	username: {
		type: String,
		required: true,
		unique: true
	},
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true
	},
	emailConfirmed: {
		type: Boolean,
		default: false
	},
	phone: {
		type: String,
		required: true,
		unique: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true
	},
	status: {
		type: EStatus,
		required: true,
		default: EStatus.Inactive
	},
	role: {
		type: ERole,
		required: true,
		default: ERole.User
	}
});

export default mongoose.model<IUserEntity>('User', UserSchema, 'Users');
