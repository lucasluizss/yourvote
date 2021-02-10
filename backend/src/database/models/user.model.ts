import mongoose, { Schema } from 'mongoose';

import { IUserEntity } from '../../domain/user/user.entity';

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
		type: Number,
		required: true,
    min: 0,
    max: 2,
    default: 0
	},
	role: {
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
},
{
	timestamps: true
});

export default mongoose.model<IUserEntity>('User', UserSchema, 'Users');
