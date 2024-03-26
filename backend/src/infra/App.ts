import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { productRoutes, userRoutes } from './http/routes';
import { errorMiddleware } from './http/middlewares';

export default class App {
  public app: express.Express;
  constructor() {
    this.app = express();
    this._config()
    this.setRoutes()
  }

  private _config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'))
    this.app.use(morgan('common'))
  }

  private setRoutes(): void {
    this.app.use('/user', userRoutes);
    this.app.use('/product',productRoutes)
    this.app.get('/', (_req, res) => {
        res.status(200).send('Delivery API Running!');
      });

    this.app.use(errorMiddleware)
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`API Running on port ${PORT}`));
  }
}
