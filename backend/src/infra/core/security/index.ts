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

export const sign = (id: string) => {
	const secoundsOfDay = 86400;

	return jwt.sign({ id: id }, environment.SECRET as string, {
		expiresIn: secoundsOfDay
	});
}