import express from 'express';
import userRoutes from '../modules/user/user.routes';
import authRoutes from '../modules/account/account.routes';
import electionRoutes from '../modules/election/election.routes';

const routes = express.Router();

routes.use('/users', userRoutes);
routes.use('/account', authRoutes);
routes.use('/election', electionRoutes);

export default routes;