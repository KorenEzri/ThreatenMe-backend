import { Request, Response, Router } from 'express';
import { checkToken } from '../../middelwares/checkToken';
import authRouter from './auth';
import onionRouter from './onion';
import databaseRouter from './database';
const router = Router();

const unknownEndpoint = (req: Request, res: Response) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

router.use(authRouter);
router.use('/onion', onionRouter);
router.use('/database', databaseRouter);
router.use(checkToken);

router.use(unknownEndpoint);
export default router;
