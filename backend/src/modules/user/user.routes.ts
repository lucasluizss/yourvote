import { CreateUserValidator, UpdateUserValidator } from './../../infra/core/validators/index';
import express from 'express';
import userController from './user.controller';

const routes = express.Router();

routes.get('/', userController.index);
routes.get('/:id', userController.show);
routes.post('/', CreateUserValidator, userController.create);
routes.put('/:id', UpdateUserValidator, userController.update);
routes.delete('/:id', userController.delete);

export default routes;