import express from 'express';
import helmet from 'helmet';
import routes from './src/routes';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(
  cors({
    allowedHeaders: ['Content-Type'],
    origin: '*',
    preflightContinue: true,
  }),
);
app.use(helmet());
app.use('/api', routes);

export default app;
