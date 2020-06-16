import express from 'express';
import userRoutes from '../modules/user/user.routes';
import authRoutes from '../modules/account/account.routes';

const routes = express.Router();

routes.use('/users', userRoutes);
routes.use('/account', authRoutes);

export default routes;