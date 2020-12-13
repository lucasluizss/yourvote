import express from 'express';
import userRoutes from '../modules/user/user.routes';
import authRoutes from '../modules/account/account.routes';
import sessionRoutes from '../modules/session/session.routes';
import candidateRoutes from '../modules/candidate/candidate.routes';
import votesRoutes from '../modules/vote/vote.routes';
import guestVotersRoutes from '../modules/guest-voter/guest-voter.routes';

const routes = express.Router();

routes.use('/users', userRoutes);
routes.use('/accounts', authRoutes);
routes.use('/sessions', sessionRoutes);
routes.use('/candidates', candidateRoutes);
routes.use('/votes', votesRoutes);
routes.use('/guest-voters', guestVotersRoutes);

export default routes;