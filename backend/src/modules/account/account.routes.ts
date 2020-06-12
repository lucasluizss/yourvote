import { authorize } from './../../infra/core/middlewares/Authorize';
import { LoginValidator } from '../../infra/core/validators/account.validator';
import express from 'express';
import authController from './account.controller';
import { ERole } from '../../domain/enums/Roles.enum';

const routes = express.Router();

routes.post('/authenticate', LoginValidator, authController.authenticate);
routes.get('/confirm/:token', authController.comfirmEmail);
routes.post('/make-admin', authorize([ERole.Admin]), authController.makeAdmin);

export default routes;