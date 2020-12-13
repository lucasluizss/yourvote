import express from 'express';

import { ERole } from './../../domain/enums/Roles.enum';
import { authorize } from './../../infra/core/middlewares/Authorize';
import VoteController from './vote.controller';

const routes = express.Router();
const sessionController = new VoteController();

routes.get('/:sessionId/poll', authorize([ERole.Admin]), sessionController.index);
routes.post('/', sessionController.create);
routes.put('/:id', authorize(), sessionController.update);
routes.delete('/:id', authorize([ERole.Admin]), sessionController.delete);

export default routes;