import express from 'express';

import { createFeedBack } from '../controllers/feedback';
import { createUserTheme, getUserTheme } from '../controllers/theme';

const router = express.Router();

/* -------- FEEDBACK --------*/

/**
 * @openapi
 * tags:
 *   - name: FeedBack
 *     description: Ручки для формы обратной связи
 *   - name: Theme
 *     description: Ручки для темизации
 * components:
 *   schemas:
 *     FeedBack:
 *       type: object
 *       properties:
 *         _id:
 *           type: number
 *           format: number
 *         name:
 *           type: string
 *           format: string
 *         email:
 *           type: string
 *           format: string
 *         text:
 *           type: string
 *           format: string
 *     Theme:
 *       type: object
 *       properties:
 *         _id:
 *           type: number
 *           format: number
 *         theme:
 *           type: string
 *           format: string
 *         user:
 *           type: string
 *           format: string
 */

/**
 * @openapi
 * /feedback:
 *   post:
 *     tags: ['FeedBack']
 *     description: Добавление нового обращения
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/FeedBack'
 *     responses:
 *       201:
 *         description: Возвращает добавленное обращение
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FeedBack'
 */
router.post('/feedback', createFeedBack);

/* -------- THEMA --------*/

/**
 * @openapi
 * /theme:
 *   post:
 *     tags: ['Theme']
 *     description: Добавление темы пользователя
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Theme'
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                  type: string
 *                  format: string
 */
router.post('/theme', createUserTheme);

/**
 * @openapi
 * /theme:
 *   get:
 *     tags: ['Theme']
 *     description: Получение темы пользователя
 *     parameters:
 *       - name: user
 *         required: true
 *         in: Пользователь
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               format: string
 */
router.get('/theme', getUserTheme);

export default router;
