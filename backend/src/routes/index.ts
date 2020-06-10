import express from 'express';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';

const routes = express.Router();

routes.use('/user', userRoutes);
routes.use('/auth', authRoutes);

export default routes;