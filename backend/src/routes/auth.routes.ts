import express from 'express';
import AuthController from '../controllers/auth.controller';

const routes = express.Router();

routes.post('/login', AuthController.login);

export default routes;