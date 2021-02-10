import { ERole } from '../../domain/enums/Roles.enum';

declare global {
  namespace Express {
    export interface Request {
      userId?: string;
      role: ERole;
    }
  
    export interface Response {
      userId?: string;
      role: ERole;
    }
  }
}
