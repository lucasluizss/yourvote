import { Status } from './Enums';

export default interface SessionModel {
	_id?: string;
	title: string;
	description: string;
	status?: Status;
	startAt: Date;
	expireAt: Date;
	candidatesIds?: string[];
}
