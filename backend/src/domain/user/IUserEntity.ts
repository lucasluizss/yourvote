import { Document } from 'mongoose';

import { ERole } from '../enums/Roles.enum';
import { EStatus } from '../enums/Status.enum';

export interface IUserEntity extends Document {
  username: string;
  name: string;
  email: string;
  emailConfirmed: boolean;
  password: string;
  phone: string;
  status: EStatus;
  role: ERole;
  createdAt: Date;
  updatedAt?: Date;
}
