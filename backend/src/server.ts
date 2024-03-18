import express from 'express';

const app = express();

app.get('/', (_req, res) => {
  res.status(200).send('Delivery API Running!');
});

app.listen(3001, () => console.log('Running on port 3001'));
