import UserModel from './UserModel';

export default interface CandidateModel extends UserModel {
	userId?: string;
	code?: string;
	guestCode?: string;
}
