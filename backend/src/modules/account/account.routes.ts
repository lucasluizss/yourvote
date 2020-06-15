import express from 'express';
import authController from './account.controller';
import { ERole } from '../../domain/enums/Roles.enum';
import { authorize } from './../../infra/core/middlewares/Authorize';
import {
	LoginValidator,
	ResetPasswordValidator
} from '../../infra/core/validators/account.validator';

const routes = express.Router();

routes.post('/authenticate', LoginValidator, authController.authenticate);
routes.get('/confirm/:token', authController.comfirmEmail);
routes.post('/make-admin', authorize([ERole.Admin]), authController.makeAdmin);
routes.get('/forgot-password', authController.forgotPassword);
routes.post('/reset-password', ResetPasswordValidator, authController.resetPassword);

export default routes;