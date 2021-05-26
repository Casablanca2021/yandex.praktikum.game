import express from 'express';

import { createFeedBack } from '../controllers/feedback';

const feedbackRoutes = express.Router();

feedbackRoutes.post('/', createFeedBack);

export default feedbackRoutes;
