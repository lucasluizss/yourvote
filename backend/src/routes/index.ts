import express from 'express';
import userRoutes from '../modules/user/user.routes';
import authRoutes from '../modules/account/account.routes';
import electionRoutes from '../modules/election/election.routes';
import candidateRoutes from '../modules/candidate/candidate.routes';
import votesRoutes from '../modules/vote/vote.routes';

const routes = express.Router();

routes.use('/users', userRoutes);
routes.use('/accounts', authRoutes);
routes.use('/elections', electionRoutes);
routes.use('/candidates', candidateRoutes);
routes.use('/votes', votesRoutes);

export default routes;