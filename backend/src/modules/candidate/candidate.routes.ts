import express from 'express';

import { ERole } from './../../domain/enums/Roles.enum';
import { authorize } from './../../infra/core/middlewares/Authorize';
import CandidateController from './candidate.controller';

const routes = express.Router();
const candidateController = new CandidateController();

routes.get('/', authorize([ERole.Admin]), candidateController.index);
routes.get('/session/:sessionId', candidateController.indexBySession);
routes.get('/:id', authorize([ERole.Admin]), candidateController.show);
routes.post('/', authorize(), candidateController.create);
routes.put('/:id', authorize([ERole.Admin]), candidateController.update);
routes.delete('/:id', authorize([ERole.Admin]), candidateController.delete);

export default routes;