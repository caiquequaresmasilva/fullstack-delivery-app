import App from './infra/App';
import 'dotenv/config'

const PORT = process.env.API_PORT || 3001
new App().start(PORT)
