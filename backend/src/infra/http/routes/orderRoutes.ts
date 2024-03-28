import { Router } from 'express';
import { makeAuthMiddleware, makeOrderController } from '../../factories';
import { RequestWithUser, roleGuard } from '../middlewares';

const orderRoutes = Router();
const controller = makeOrderController();
const auth = makeAuthMiddleware();

orderRoutes.use((req, res, next) =>
  auth.handle(req as RequestWithUser, res, next),
);

orderRoutes.post(
  '/',
  (req, res, next) => roleGuard('customer')(req as RequestWithUser, res, next),
  (req, res, next) => controller.create(req as RequestWithUser, res, next),
);

orderRoutes.get('/', (req, res, next) =>
  controller.getOrders(req as RequestWithUser, res, next),
);

orderRoutes.get('/:id', (req, res, next) =>
  controller.getOrder(req as unknown as RequestWithUser, res, next),
);

orderRoutes.patch('/:id', (req, res, next) =>
  controller.updateStatus(req as unknown as RequestWithUser, res, next),
);

export default orderRoutes;
