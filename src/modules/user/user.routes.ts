import { authorize } from './../../infra/core/middlewares/Authorize';
import { CreateUserValidator, UpdateUserValidator } from '../../infra/core/validators/user.validator';
import express from 'express';
import userController from './user.controller';
import { ERole } from '../../domain/enums/Roles.enum';

const routes = express.Router();

routes.get('/', authorize([ERole.Admin]), userController.index);
routes.get('/:id', userController.show);
routes.post('/', CreateUserValidator, userController.create);
routes.put('/:id', authorize(), UpdateUserValidator, userController.update);
routes.delete('/:id', authorize(), userController.delete);

export default routes;