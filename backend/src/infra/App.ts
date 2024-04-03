import express from 'express';
import swaggerUi from 'swagger-ui-express';
import morgan from 'morgan';
import cors from 'cors';
import { orderRoutes, productRoutes, userRoutes } from './http/routes';
import { errorMiddleware } from './http/middlewares';
import swaggerDocs from '../infra/http/doc/swagger.json';

export default class App {
  public app: express.Express;
  constructor() {
    this.app = express();
    this._config();
    this.setRoutes();
  }

  private _config(): void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PATCH,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static('public'));
    this.app.use(
      morgan('common', { skip: (req, res) => process.env.NODE_ENV === 'test' }),
    );
    this.app.use(
      '/doc',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocs, {
        customJs:
          'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui-bundle.min.js',
        customCss:
          'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui.min.css',
      }),
    );
  }

  private setRoutes(): void {
    this.app.use('/user', userRoutes);
    this.app.use('/product', productRoutes);
    this.app.use('/order', orderRoutes);

    this.app.get('/', (_req, res) => {
      res.redirect('doc');
    });

    this.app.use(errorMiddleware);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`API Running on port ${PORT}`));
  }
}

export const { app } = new App();
