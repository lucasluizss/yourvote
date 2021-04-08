import { Router } from 'express';

import { ERole } from './../../domain/enums/Roles.enum';
import candidateController from './candidate.controller';
import { authorize } from './../../infra/core/middlewares/Authorize';

class CandidateRouter {
	public readonly router: Router;

	constructor() {
		this.router = Router();
		this.setRoutes();
	}

	setRoutes() {
		this.router.get('/', authorize([ERole.Admin]), candidateController.index);
		this.router.get('/session/:sessionId', candidateController.indexBySession);
		this.router.get('/:id', authorize([ERole.Admin]), candidateController.show);
		this.router.post('/', authorize(), candidateController.create);
		this.router.put('/:id', authorize([ERole.Admin]), candidateController.update);
		this.router.delete('/:id', authorize([ERole.Admin]), candidateController.delete);
	}
}

export default new CandidateRouter().router;