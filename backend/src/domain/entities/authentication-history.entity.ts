import { Document } from 'mongoose';

export default interface IAuthenticationHistory extends Document {
	userId: string;
	loginDate: Date;
	logoutDate?: Date;
	ip: string;
	device?: string;
	token: string;
}