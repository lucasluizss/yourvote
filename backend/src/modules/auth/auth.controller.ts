import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { container } from 'tsyringe';
import AuthService from './auth.service';
import { Request, Response } from "express";
import { generateToken } from '../../infra/core/security';
import Result from '../../infra/core/factories/result.factory';

const Account = container.resolve(AuthService);

export default class AuthController {
	async authenticate(request: Request, response: Response) {
		const { email, password, ipAddress = request.ip } = request.body;

		const account = await Account.getByEmail(email);

    if (!account || !bcrypt.compareSync(password, account.passwordHash)) {
        throw 'Email or password is incorrect';
    }

    const jwtToken = jwt.sign(
			{ sub: account.id, id: account.id },
			String(process.env.SECRET),
			{ expiresIn: '15m' }
		);

		const refreshToken = generateToken(ipAddress);

    account.refreshTokens.push(refreshToken);
    account.save();

    return response.json(Result.Success({ token: jwtToken, refreshToken: refreshToken.token }));
}
}
