
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
		this.app.use('/', routes);
	}

	private configureMiddlewares() {
		this.app.use(cors());
		this.app.use(express.json());
	}
}

export default new App().app;