import { Router } from 'express';
import {
  makeAuthMiddleware,
  makeCreateUserGuard,
  makeUserController,
} from '../../factories';
import { RequestWithUser, roleGuard, validationMiddleware } from '../middlewares';

const userRoutes = Router();
const userController = makeUserController();
const createUserGuard = makeCreateUserGuard();
const authMiddleware = makeAuthMiddleware();

userRoutes.post(
  '/',
  (req, res, next) => createUserGuard.handle(req, res, next),
  validationMiddleware,
  (req, res, next) => userController.create(req, res, next),
);

userRoutes.post('/login', (req, res, next) =>
  userController.login(req, res, next),
);

userRoutes.use((req, res, next) =>
  authMiddleware.handle(req as RequestWithUser, res, next),
);
userRoutes.use((req,res,next) => roleGuard('admin')(req as RequestWithUser,res,next));
userRoutes.get('/', (req, res, next) =>
  userController.getUsers(req, res, next),
);
userRoutes.delete('/:id', (req, res, next) =>
  userController.delete(req, res, next),
);

export default userRoutes;
