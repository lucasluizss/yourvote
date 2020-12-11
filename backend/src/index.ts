import 'reflect-metadata';
import cors from 'cors';
import express, { Application, Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';
import bodyParser from 'body-parser';

import './infra/container';
import routes from './routes';
import swagger from './infra/shared/swagger';

class App {
  public readonly app: Application;

  private readonly conf = {
    port: process.env.PORT || 3333,
    originUndefined: (
      request: Request,
      response: Response,
      next: NextFunction,
    ) => {
      const origin = request.headers.origin || request.headers.host;
      if (!origin) {
        response.json({
          message: `Hi you are visiting the service locally. If this was a CORS the origin header should not be ${origin}`,
        });
      } else {
        next();
      }
    },
    cors: {
      origin: (origin: any, cb: any) => cb(null, true),
      optionsSuccessStatus: 200,
    },
  };

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
    const { originUndefined } = this.conf;
    this.app.use(originUndefined, cors(this.conf.cors));
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(express.json());
  }

  private handleErrors() {
    this.app.use(errors());
  }
}

export default new App().app;
