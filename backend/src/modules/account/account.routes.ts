import { Router } from 'express';

import authController from './account.controller';
import { ERole } from '../../domain/enums/Roles.enum';
import { authorize } from './../../infra/core/middlewares/Authorize';
import {
	LoginValidator,
	ActiveUserValidator,
	ConfirmEmailValidator,
	ResetPasswordValidator,
	ForgotPasswordValidator
} from '../../infra/core/validators/account.validator';

class AccountRouter {
	public readonly router: Router;

	constructor() {
		this.router = Router();
		this.setRoutes();
	}

	setRoutes() {
		this.router.post('/authenticate', LoginValidator, authController.authenticate);
		this.router.post('/logout', authController.logout);
		this.router.post('/refresh', authController.refresh);
		this.router.get('/confirm/:token', ConfirmEmailValidator, authController.comfirmEmail);
		this.router.post('/active', authorize([ERole.Admin]), ActiveUserValidator, authController.activeUser);
		this.router.post('/make-admin', authorize([ERole.Admin]), authController.makeAdmin);
		this.router.post('/forgot-password', ForgotPasswordValidator, authController.forgotPassword);
		this.router.post('/reset-password', authorize(), ResetPasswordValidator, authController.resetPassword);
	}
}

export default new AccountRouter().router;