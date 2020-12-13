import express from 'express';

import { ERole } from '../../domain/enums/Roles.enum';
import { authorize } from '../../infra/core/middlewares/Authorize';
import VoteController from './guest-voter.controller';

const routes = express.Router();
const sessionController = new VoteController();

routes.get('/', authorize(), sessionController.index);
routes.post('/', authorize(), sessionController.create);
routes.post('/guest', sessionController.validate);
routes.delete('/:id', authorize([ERole.Admin]), sessionController.delete);

export default routes;