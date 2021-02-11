import { Role } from './role.enum';
import { Status } from './status.enum';

export default interface UserModel {
  id: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  status: Status;
}