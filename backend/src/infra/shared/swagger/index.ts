import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

const router = express();

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;