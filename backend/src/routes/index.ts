import express from 'express';
import userRoutes from '../modules/user/user.routes';
import authRoutes from '../modules/account/account.routes';
import electionRoutes from '../modules/election/election.routes';

const routes = express.Router();

routes.use('/users', userRoutes);
routes.use('/accounts', authRoutes);
routes.use('/elections', electionRoutes);

export default routes;