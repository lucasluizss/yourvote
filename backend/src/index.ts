import 'reflect-metadata';
import cors from 'cors';
import express, { Application } from 'express';
import { errors } from 'celebrate';
import bodyParser from 'body-parser';

import './infra/container';
import routes from './routes';
import swagger from './infra/shared/swagger';
import CorsConfig from './infra/core/middlewares/CorsConfig';

class App {
  public readonly app: Application;

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
    const { undefinedOriginValidator, corsConfiguration } = CorsConfig;
    this.app.use(undefinedOriginValidator, cors(corsConfiguration));
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(express.json());
  }

  private handleErrors() {
    this.app.use(errors());
  }
}

export default new App().app;
