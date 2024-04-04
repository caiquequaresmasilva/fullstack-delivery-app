import App from './infra/App';
import 'dotenv/config'

const PORT = process.env.API_PORT || 3333
new App().start(PORT)
