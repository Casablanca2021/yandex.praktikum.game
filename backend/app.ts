import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { sequelize } from './db_context/postgres';
import router from './routes';
import { options } from './swaggerConfig';

sequelize.authenticate().then(() => {
  console.log('Connection to Postgres base established');
});

sequelize.sync({ force: true }).then(() => {
  console.log('Connection to Postgres base established');
});

const baseUrl = process.env.MONGO_DATABASE || 'mongodb://root:example@localhost:27017/my-db?authSource=admin';

mongoose
  .connect(baseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connection to mongodb base established');
  })
  .catch((ex) => {
    console.log(ex);
  });

const app = express();

app.use(bodyParser.json());

const url = '/api/v1';

app.use(`${url}`, router);

const swaggerDocs = swaggerJsDoc(options);
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocs));

export default app;
