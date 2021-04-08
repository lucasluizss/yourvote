import express from 'express';

import userRoutes from '../modules/user/user.routes';
import authRoutes from '../modules/account/account.routes';
import sessionRoutes from '../modules/session/session.routes';
import candidateRoutes from '../modules/candidate/candidate.routes';
import votesRoutes from '../modules/vote/vote.routes';
import guestVotersRoutes from '../modules/guest-voter/guest-voter.routes';

class Routes {
  public readonly routes: express.Router;

  constructor() {
    this.routes = express.Router();
    this.defineRoutes();
  }

  private defineRoutes(): void {
    this.routes.use('/users', userRoutes);
    this.routes.use('/accounts', authRoutes);
    this.routes.use('/sessions', sessionRoutes);
    this.routes.use('/candidates', candidateRoutes);
    this.routes.use('/votes', votesRoutes);
    this.routes.use('/guest-voters', guestVotersRoutes);
  }
}

export default new Routes().routes;
