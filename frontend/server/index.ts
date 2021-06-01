import express from 'express';
import cookieParser from 'cookie-parser';
import { ssr } from './ssr';

const PORT = process.env.CLIENT_PORT || 50021;
const app = express();

app.use('/', express.static('./dist/static'));

app.use(cookieParser());

ssr(app);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
