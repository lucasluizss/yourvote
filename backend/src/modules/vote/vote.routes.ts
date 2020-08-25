import { ERole } from './../../domain/enums/Roles.enum';
import { authorize } from './../../infra/core/middlewares/Authorize';
import express from 'express';
import VoteController from './vote.controller';

const routes = express.Router();
const electionController = new VoteController();

routes.get('/', authorize([ERole.Admin]), electionController.index);
routes.get('/:id', authorize(), electionController.show);
routes.post('/', authorize(), electionController.create);
routes.put('/:id', authorize(), electionController.update);
routes.delete('/:id', authorize([ERole.Admin]), electionController.delete);

export default routes;