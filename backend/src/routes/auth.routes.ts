import express from 'express';
import AuthController from '../controllers/auth.controller';

const routes = express.Router();

const authController = new AuthController()

routes.post('/login', authController.login);

export default routes;