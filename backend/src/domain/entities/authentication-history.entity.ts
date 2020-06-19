import { Document } from 'mongoose';

export default interface IAuthenticationHistory extends Document {
	id: string;
	userId: string;
	loginDate: Date;
	logoutDate?: Date;
	ip: string;
	device?: string;
	token: string;
}