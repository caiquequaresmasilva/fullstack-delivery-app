import { Router } from 'express';
import {
  makeCreateUserGuard,
  makeRoleGuard,
  makeUserController,
} from '../../factories';
import { validationMiddleware } from '../middlewares';

const userRoutes = Router();
const userController = makeUserController();
const createUserGuard = makeCreateUserGuard();
const adminRoleGuard = makeRoleGuard('admin');

userRoutes.post(
  '/',
  (req, res, next) => createUserGuard.handle(req, res, next),
  validationMiddleware,
  (req, res, next) => userController.create(req, res, next),
);

userRoutes.post('/login', (req, res, next) =>
  userController.login(req, res, next),
);

userRoutes.use((req, res, next) => adminRoleGuard.handle(req, res, next));
userRoutes.get('/', (req, res, next) =>
  userController.getUsers(req, res, next),
);
userRoutes.delete('/:id', (req, res, next) =>
  userController.delete(req, res, next),
);

export default userRoutes;
