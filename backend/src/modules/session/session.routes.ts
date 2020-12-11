import express from 'express';

import { ERole } from '../../domain/enums/Roles.enum';
import { authorize } from '../../infra/core/middlewares/Authorize';
import SessionsController from './session.controller';

const routes = express.Router();
const sessionsController = new SessionsController();

routes.get('/', authorize([ERole.Admin]), sessionsController.index);
routes.get('/expired', authorize([ERole.Admin]), sessionsController.indexExpired);
routes.get('/future', authorize([ERole.Admin]), sessionsController.indexFuture);
routes.get('/:id', authorize([ERole.Admin]), sessionsController.show);
routes.post('/', authorize([ERole.Admin]), sessionsController.create);
routes.put('/:id', authorize([ERole.Admin]), sessionsController.update);
routes.delete('/:id', authorize([ERole.Admin]), sessionsController.delete);

export default routes;