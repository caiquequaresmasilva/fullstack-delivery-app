import { NextFunction, Request, Response } from "express";
import { ProductService } from "../../../application/services";
import { HttpStatus } from "../../enums";

export default class ProductController {
  constructor(private readonly service: ProductService){}

  async getAll(req: Request,res: Response,next:NextFunction){
    try {
      const response = await this.service.getAll()
      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      next(error)
    }
  }
}