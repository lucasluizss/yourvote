import express from 'express';
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

const routes = express.Router();

routes.post('/authenticate', LoginValidator, authController.authenticate);
routes.get('/confirm/:token', ConfirmEmailValidator, authController.comfirmEmail);
routes.post('/active-user/', authorize([ERole.Admin]), ActiveUserValidator, authController.activeUser);
routes.post('/make-admin', authorize([ERole.Admin]), authController.makeAdmin);
routes.post('/forgot-password', ForgotPasswordValidator, authController.forgotPassword);
routes.post('/reset-password', ResetPasswordValidator, authController.resetPassword);

export default routes;