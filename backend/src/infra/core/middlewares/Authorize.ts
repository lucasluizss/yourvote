import { ERole } from './../../../domain/enums/Roles.enum';
import { Request, Response, NextFunction } from 'express';
import expressJwt from 'express-jwt';
import jwt from 'jsonwebtoken';
import UserContext from '../../../database/models/user.model';
import environment from '../../../environment/environment';

export const authorize = (roles: ERole[] = []) => {
	const secret = environment.SECRET as string;

	return [
		expressJwt({ secret }),

		async (request: Request, response: Response, next: NextFunction) => {
			let token = request.headers.authorization;
			token = token?.includes('Bearer ') ? token.split(' ')[1] : token;

			if (!token) {
				return response.status(403).json({ message: 'No token provided.' });
			}

			jwt.verify(token, secret, async (error, decoded: any) => {
				if (error) {
					return response.status(500).json({ message: 'Failed to authenticate token.' });
				}

				const userId = decoded.id;
				const account = await UserContext.findById(userId);

				if (!account || (roles.length && !roles.includes(account.role))) {
					return response.status(401).json({ message: 'Unauthorized' });
				}

				return next();
			});
		}
	];
}