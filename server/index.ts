import express, { Request, Response } from 'express';

import html from './render';

const PORT = process.env.PORT || 3000;
const app = express();

app.use('/', express.static('./dist/static'));

app.get('*', (req: Request, res: Response) => {
  const context = {};

  return res.send(html(req, context));
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
