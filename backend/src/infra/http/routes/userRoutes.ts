import { Router } from 'express';
import { makeUserController } from '../../factories';
import { validationMiddleware } from '../middlewares';

const userRoutes = Router();
const userController = makeUserController();

userRoutes.post('/', validationMiddleware, (req, res, next) =>
  userController.create(req, res, next),
);
userRoutes.post('/login', (req, res, next) =>
  userController.login(req, res, next),
);

export default userRoutes;
