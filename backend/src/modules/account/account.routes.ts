import { LoginValidator } from '../../infra/core/validators/account.validator';
import express from 'express';
import authController from './account.controller';

const routes = express.Router();

routes.post('/authenticate', LoginValidator, authController.authenticate);

export default routes;