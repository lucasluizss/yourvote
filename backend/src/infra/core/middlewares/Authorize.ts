import { ERole } from './../../../domain/enums/Roles.enum';
import { Request, Response, NextFunction } from 'express';
import expressJwt from 'express-jwt';
import jwt from 'jsonwebtoken';
import UserContext from '../../../database/models/user.model';

export const authorize = (role: ERole) => {
	const secret = process.env.SECRET || '';

	return [
		expressJwt({ secret }),

		async (request: Request, response: Response, next: NextFunction) => {
			const token = request.headers['authorization'];

			if (!token) {
				return response.status(403).send({ message: 'No token provided.' });
			}

			jwt.verify(token, secret, async (error, decoded: any) => {
				if (error) {
					return response.status(500).send({ message: 'Failed to authenticate token.' });
				}

				console.log('decodificado ==== ', decoded);

				const userId = decoded.id;
				const account = await UserContext.findById(userId);

				if (!account || account.role == role) {
					return response.status(401).json({ message: 'Unauthorized' });
				}

				next();
			});

			next();
		}
	];
}