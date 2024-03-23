import express from 'express';
import 'dotenv/config'

const app = express();
const PORT = process.env.API_PORT || 3001

app.get('/', (_req, res) => {
  res.status(200).send('Delivery API Running!');
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
