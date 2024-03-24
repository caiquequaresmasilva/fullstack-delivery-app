import { Router } from 'express';
import { makeCreateUserGuard, makeUserController } from '../../factories';
import { validationMiddleware } from '../middlewares';

const userRoutes = Router();
const userController = makeUserController();
const createUserGuard = makeCreateUserGuard();

userRoutes.post(
  '/',
  (req, res, next) => createUserGuard.handle(req, res, next),
  validationMiddleware,
  (req, res, next) => userController.create(req, res, next),
);
userRoutes.post('/login', (req, res, next) =>
  userController.login(req, res, next),
);

export default userRoutes;
