import { LoginValidator } from './../../infra/core/validators/index';
import express from 'express';
import authController from './account.controller';

const routes = express.Router();

routes.post('/authenticate', LoginValidator, authController.authenticate);

export default routes;