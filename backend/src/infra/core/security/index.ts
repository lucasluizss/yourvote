import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import environment from '../../../environment/environment';

export const generateToken = (ipAddress: string) => {
	return {
		token: crypto.randomBytes(40).toString('hex'),
		expires: new Date(Date.now() + 7*24*60*60*1000),
		createdByIp: ipAddress
	};
};

export const generateJtwToken = (id: string, expireMinutes?: string) => {
	return jwt.sign({ id: id }, environment.SECRET as string, {
		expiresIn: expireMinutes || '1d'
	});
}

export const verifyJwtToken = (token: string): Promise<string> => {
	const secret = environment.SECRET as string;

	return new Promise((resolve, reject) => {
		jwt.verify(token, secret, (error, decoded: any) => {
			if (error) {
				reject('Invalid token');
			}

			resolve(decoded.id);
		});
	});
}