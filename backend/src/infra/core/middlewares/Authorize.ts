import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import Result from '../factories/result.factory';
import { Request, Response, NextFunction } from 'express';
import { ERole } from './../../../domain/enums/Roles.enum';
import environment from '../../../environment/environment';
import { EStatus } from '../../../domain/enums/Status.enum';
import UserContext from '../../../database/models/user.model';
import AuthenticationHistoryContext from '../../../database/models/authentication-history.model';

export const authorize = (roles: ERole[] = []) => {
	const secret = environment.SECRET as string;

	return [
		expressJwt({ secret }),

		async (request: Request, response: Response, next: NextFunction) => {
			let token = request.headers.authorization;

			token = token?.includes('Bearer ') ? token.split(' ')[1] : token;

			if (!token) {
				return response.status(403).json(Result.Fail('No token provided.'));
			}

			const authenticationHistory = await AuthenticationHistoryContext.findOne({ token: token });

			if (authenticationHistory?.logoutDate) {
				return response.status(401).json(Result.Fail('Invalid token!'));
			}

			jwt.verify(token, secret, async (error, decoded: any) => {
				if (error) {
					return response.status(500).json({ message: 'Failed to authenticate token.' });
				}

				const userId = decoded.id;
				const account = await UserContext.findById(userId);

				if (!account || (roles.length && !roles.includes(account.role))) {
					return response.status(401).json(Result.Fail('Unauthorized!'));
				} else if (account.status === EStatus.Inactive) {
					return response.status(401).json(Result.Fail('User must be actived, please contact an admin.'));
				} else if (!account.emailConfirmed) {
					return response.status(401).json(Result.Fail('You must confirm your email'));
				}

				request.userId = userId;

				return next();
			});
		}
	];
}