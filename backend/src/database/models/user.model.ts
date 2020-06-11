import { IUserEntity } from './../../domain/entities/user.entity';
import { EStatus } from './../../domain/enums/Status.enum';

import mongoose, { Schema } from 'mongoose';

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
		required: true
	}
});

export default mongoose.model<IUserEntity>('User', UserSchema, 'Users');
