import swaggerUi from 'swagger-ui-express';
import express, { Application } from 'express';

import swaggerDocument from './swagger.json';

class SwaggerRouter {
  public readonly router: Application;

  constructor() {
    this.router = express();
    this.router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }
}

export default new SwaggerRouter().router;
