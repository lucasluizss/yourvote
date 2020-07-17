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
		enum: EStatus,
		default: EStatus.Inactive
	},
	role: {
		type: ERole,
		required: true,
		enum: ERole,
		default: ERole.User
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
},
{
	timestamps: true
});

export default mongoose.model<IUserEntity>('User', UserSchema, 'Users');
