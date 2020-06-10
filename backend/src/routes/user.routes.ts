import express from 'express';
import UserController from '../controllers/user.controller';

const routes = express.Router();

const userController = new UserController();

routes.get('/', userController.index);
routes.get('/:id', userController.show);
routes.post('/', userController.create);
routes.put('/:id', userController.update);
routes.delete('/:id', userController.delete);

export default routes;