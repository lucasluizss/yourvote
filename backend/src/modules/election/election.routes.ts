import { ERole } from './../../domain/enums/Roles.enum';
import { authorize } from './../../infra/core/middlewares/Authorize';
import express from 'express';
import ElectionController from './election.controller';

const routes = express.Router();
const electionController = new ElectionController();

routes.get('/', authorize([ERole.Admin]), electionController.index);
routes.get('/:id', authorize([ERole.Admin]), electionController.show);
routes.post('/', authorize([ERole.Admin]), electionController.create);
routes.put('/', authorize([ERole.Admin]), electionController.update);
routes.delete('/:id', authorize([ERole.Admin]), electionController.delete);

export default routes;