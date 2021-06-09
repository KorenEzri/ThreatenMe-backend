import express from 'express';
import helmet from 'helmet';
import routes from './src/routes';

const app = express();
app.use(express.json());
app.use(helmet());
app.use('/api', routes);

export default app;
