import './database';
import cors from 'cors';
import 'reflect-metadata';
import './infra/container';
import express from 'express';
import routes from './routes';
import bodyParser from 'body-parser';
import { errorHandler } from './infra/core/middlewares/ErrorHandler';

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
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(bodyParser.json());
		this.app.use(cors());
		this.app.use(express.json());
	}

	private handleErrors() {
		this.app.use(errorHandler);
	}
}

export default new App().app;