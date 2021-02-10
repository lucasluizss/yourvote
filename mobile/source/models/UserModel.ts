import { Role, Status } from './Enums';

export default interface UserModel {
	_id?: string;
	id?: string;
	name: string;
	email: string;
	avatar?: string;
	role: Role;
	status: Status;
	favorites?: string[];
}
