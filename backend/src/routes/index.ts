import express from 'express';
import userRoutes from '../modules/user/user.routes';
import authRoutes from '../modules/account/account.routes';

const routes = express.Router();

routes.use('/user', userRoutes);
routes.use('/auth', authRoutes);

export default routes;