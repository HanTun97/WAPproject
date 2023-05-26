const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User Login
 *     tags: [Login]
 *     requestBody:
 *       description: Optional description in *Markdown*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       "200":
 *         $ref: '#/components/responses/200'
 *       "401":
 *         $ref: '#/components/responses/401'
 */

router.post('/', userController.validate);


module.exports = router;