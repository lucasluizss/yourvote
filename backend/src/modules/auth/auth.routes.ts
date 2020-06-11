import express from 'express';
import authController from './auth.controller';

const routes = express.Router();

routes.post('/authenticate', authController.authenticate);

export default routes;