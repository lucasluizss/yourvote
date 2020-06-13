import './database';
import cors from 'cors';
import 'reflect-metadata';
import './infra/container';
import express from 'express';
import routes from './routes';
import { errors } from 'celebrate';
import bodyParser from 'body-parser';
import swagger from './infra/shared/swagger';

class App {
	public readonly app: express.Application;

	constructor() {
		this.app = express();

		this.loadSwagger();
		this.configureMiddlewares();
		this.configureRoutes();
		this.handleErrors();
	}

	private loadSwagger() {
		this.app.use('/docs', swagger);
	}

	private configureRoutes() {
		this.app.use('/v1/', routes);
	}

	private configureMiddlewares() {
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(bodyParser.json());
		this.app.use(cors());
		this.app.use(express.json());
	}

	private handleErrors() {
		this.app.use(errors());
	}
}

export default new App().app;