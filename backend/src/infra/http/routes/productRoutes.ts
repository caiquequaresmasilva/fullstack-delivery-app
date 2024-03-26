import { Router } from 'express';
import { makeAuthMiddleware, makeProductController } from '../../factories';
import { RequestWithUser } from '../middlewares';

const productRoutes = Router();
const productController = makeProductController();
const authMiddleware = makeAuthMiddleware();

productRoutes.use((req, res, next) =>
  authMiddleware.handle(req as RequestWithUser, res, next),
);
productRoutes.get('/', (req, res, next) =>
  productController.getAll(req, res, next),
);

export default productRoutes;
