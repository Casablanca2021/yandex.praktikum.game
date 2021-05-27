import express from 'express';
import https from 'https';
import fs from 'fs';

import { ssr } from './ssr';

const PORT = process.env.PORT || 443; //3000 localhost
const app = express();

app.use('/', express.static('./dist/static'));

ssr(app);

if (process.env.NODE_ENV !== 'production') {
  const key = fs.readFileSync('./key.pem');
  const cert = fs.readFileSync('./cert.pem');

  https.createServer({ key, cert }, app).listen(PORT, () => {
    console.info(`HTTPS Listening on port ${PORT}`);
  });
} else {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}
