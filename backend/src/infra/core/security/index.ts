import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export const generateToken = (ipAddress: string) => {
	return {
		token: crypto.randomBytes(40).toString('hex'),
		expires: new Date(Date.now() + 7*24*60*60*1000),
		createdByIp: ipAddress
	};
};

export const sign = (id: string) => {
	return jwt.sign(
		{
			sub: id,
			id: id
		},
		String(process.env.SECRET),
		{
			expiresIn: '15m'
		}
	);
}