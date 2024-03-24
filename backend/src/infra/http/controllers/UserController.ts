import { NextFunction, Request, Response } from 'express';
import UserService from '../../../application/services/UserService';
import { HttpStatus } from '../../enums';

export default class UserController {
  constructor(private readonly service: UserService) {}

  async create(req: Request, res: Response, next: NextFunction) {
    const { email, password, role, name } = req.body;
    try {
      const response = await this.service.create({name, email, password, role });
      return res.status(HttpStatus.CREATED).json(response);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
      const response = await this.service.login({ email, password });
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}
