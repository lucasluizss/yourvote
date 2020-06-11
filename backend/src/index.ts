import { errorHandler } from './infra/core/middlewares/ErrorHandler';

import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import routes from './routes';
import './infra/container';

class App {
	public readonly app: express.Application;

	constructor() {
		this.app = express();
		this.configureMiddlewares();
		this.configureRoutes();
		this.handleErrors();
	}

	private configureRoutes() {
		// TODO: Mudar rotas para versão 1 posteriormente
		this.app.use('/', routes);
	}

	private configureMiddlewares() {
		this.app.use(cors());
		this.app.use(express.json());
	}

	private handleErrors() {
		this.app.use(errorHandler);
	}
}

export default new App().app;