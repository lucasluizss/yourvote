import express from 'express';

import { ERole } from '../../domain/enums/Roles.enum';
import { authorize } from '../../infra/core/middlewares/Authorize';
import SessionsController from './session.controller';

const routes = express.Router();
const sessionsController = new SessionsController();

routes.get('/', authorize([ERole.Admin]), sessionsController.index);
routes.get('/current', authorize(), sessionsController.indexCurrent);
routes.get('/expired', authorize(), sessionsController.indexExpired);
routes.get('/future', authorize(), sessionsController.indexFuture);
routes.get('/:id', sessionsController.show);
routes.post('/active', authorize([ERole.Admin]), sessionsController.active);
routes.post('/', authorize([ERole.Admin]), sessionsController.create);
routes.put('/:id', authorize([ERole.Admin]), sessionsController.update);
routes.delete('/:id', authorize([ERole.Admin]), sessionsController.delete);

export default routes;