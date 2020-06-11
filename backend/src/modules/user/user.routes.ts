import express from 'express';
import userController from './user.controller';

const routes = express.Router();

routes.get('/', userController.index);
routes.get('/:id', userController.show);
routes.post('/', userController.create);
routes.put('/:id', userController.update);
routes.delete('/:id', userController.delete);

export default routes;